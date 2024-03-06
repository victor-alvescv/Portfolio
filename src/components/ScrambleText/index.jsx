import { useState, useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import "./style.css"

const ScrambleText = ({ children, delay, shuffle = false }) => {
  const intervalRef = useRef(null)
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const CYCLES_PER_LETTER = shuffle ? 2 : 1
  const SHUFFLE_TIME = shuffle ? 50 : 0

  const [scrambledText, setScrambledText] = useState(children)
  const [hasScrambled, setHasScrambled] = useState(false)

  const handleComplete = () => {
    stopScramble()
  }

  const generateScrambledText = (inputText) => {
    const textArray = inputText.split("")
    for (let i = textArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[textArray[i], textArray[j]] = [textArray[j], textArray[i]]
    }
    return textArray.join("")
  }

  const scramble = () => {
    let pos = 0

    intervalRef.current = setInterval(() => {
      setScrambledText(generateScrambledText(children))
      pos = shuffle ? pos + 1 : pos + 4

      if (pos >= children.length * CYCLES_PER_LETTER) {
        stopScramble()
      }
    }, SHUFFLE_TIME)
  }

  const stopScramble = () => {
    clearInterval(intervalRef.current)
    setScrambledText(children)
    setHasScrambled(true)
  }

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      if (inView && !hasScrambled) {
        scramble()
      }
    }, delay * 1000)

    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(delayTimeout)
    }
  }, [delay, inView, hasScrambled])

  useEffect(() => {
    if (inView && !hasScrambled) {
      controls.start("visible")
    }
  }, [inView, controls, hasScrambled])

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        delayChildren: delay,
        staggerChildren: 0.006,
      },
    },
  }

  const charVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  }

  return (
    <motion.span className="scrambleText">
      <span>{children}</span>
      <motion.span initial="hidden" animate={controls} variants={textVariants} ref={ref} className="scrambleText--overlay" onAnimationComplete={handleComplete}>
        {scrambledText.split("").map((char, index) => (
          <motion.span key={index} variants={charVariants}>
            {char}
          </motion.span>
        ))}
      </motion.span>
    </motion.span>
  )
}

export default ScrambleText
