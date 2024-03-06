import { useState, useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import "./style.css"
import { useInView } from "react-intersection-observer"

const ParaWriting = ({ text, delay, stagger = 0.15, sec, noblink = false }) => {
  const [pointer, setPointer] = useState(0)
  const spanRefs = useRef(new Array())
  const pointerRef = useRef(null)

  const controls = useAnimation()
  const [ref, inView] = useInView()
  const [hasAnimated, setHasAnimated] = useState(false)

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  }

  const charVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: {
      opacity: 1,
      display: "unset",
      transition: {
        duration: 0,
      },
    },
  }

  const handleCharacterComplete = () => {
    pointerRef.current.style.opacity = 1
    pointerRef.current.style.animation = "blink 1s ease infinite"
    setPointer((prev) => prev + 1)
  }

  const handleComplete = () => {
    if (noblink) {
      pointerRef.current.style.opacity = 0
      pointerRef.current.style.animation = "none"
    }
    setHasAnimated(true)
  }

  useEffect(() => {
    // Start animation when the component is in view
    if (inView && !hasAnimated) {
      controls.start("visible")
    }
  }, [inView, controls])

  return (
    <div className="paraWritingContainer">
      <motion.div className="paraWritingContainer--overlay" ref={ref} initial="hidden" animate={controls} variants={textVariants} onAnimationComplete={() => handleComplete()}>
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={charVariants} onAnimationComplete={() => handleCharacterComplete(index)} ref={(el) => spanRefs.current.push(el)}>
            {char}
          </motion.span>
        ))}
        {sec &&
          sec.split("").map((char, index) => (
            <motion.span key={index} variants={charVariants} onAnimationComplete={() => handleCharacterComplete(index)} ref={(el) => spanRefs.current.push(el)} className="sec">
              {char}
            </motion.span>
          ))}
        <span ref={pointerRef} className={`paraWritingContainer--cursor ${pointer >= text.length ? "sec" : ""}`}></span>
      </motion.div>
      <div>
        {text}
        <span className="sec">{sec}</span>
      </div>
    </div>
  )
}

export default ParaWriting
