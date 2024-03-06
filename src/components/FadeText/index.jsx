import { motion } from "framer-motion"
import "./style.css"

const FadeText = ({ children, delay, controls }) => {
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
    <motion.span className="fadeText">
      <span>{children}</span>
      <motion.span initial="hidden" animate={controls} variants={textVariants} className="fadeText--overlay">
        {children.split("").map((char, index) => (
          <motion.span key={index} variants={charVariants}>
            {char}
          </motion.span>
        ))}
      </motion.span>
    </motion.span>
  )
}

export default FadeText
