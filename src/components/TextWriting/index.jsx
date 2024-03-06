import { useState, useRef } from "react"
import { motion } from "framer-motion"
import "./style.css"

const TextWriting = ({ text, delay, controls, nocursor = false, noblink = false }) => {
  const [pointer, setPointer] = useState(0)
  const spanRefs = useRef(new Array())
  const pointerRef = useRef(null)

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        delayChildren: delay,
        staggerChildren: 0.15,
      },
    },
  }

  const charVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0,
      },
    },
  }

  const handleCharacterComplete = (index) => {
    if (pointerRef.current && spanRefs[index].current) {
      const spanWidth = spanRefs[index].current.offsetWidth
      pointerRef.current.style.opacity = 1
      pointerRef.current.style.animation = "blink 1s ease infinite"
      setPointer((prev) => prev + spanWidth)
    }
  }

  const handleComplete = () => {
    if (noblink) {
      pointerRef.current.style.opacity = 0
      pointerRef.current.style.animation = "none"
    }
  }

  return (
    <div className="textWritingContainer">
      <motion.div initial="hidden" animate={controls ? controls : "visible"} variants={textVariants} onAnimationComplete={() => handleComplete()}>
        {text.split("").map((char, index) => (
          <motion.span key={index} variants={charVariants} onAnimationComplete={() => handleCharacterComplete(index)} ref={(el) => spanRefs.current.push(el)}>
            {char}
          </motion.span>
        ))}
      </motion.div>
      {!nocursor && <div ref={pointerRef} className="textWritingContainer--pointer" style={{ left: `${pointer}px` }}></div>}
    </div>
  )
}

export default TextWriting
