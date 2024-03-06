import { motion } from "framer-motion"
import "./style.css"

const HideText = ({ children, delay, controls }) => {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        delayChildren: delay,
        staggerChildren: 0.3,
      },
    },
  }

  const charVariants = {
    hidden: { top: "100%" },
    visible: {
      top: "0%",
      transition: {
        duration: 1,
      },
    },
  }

  return (
    <motion.div className="hideText">
      <div>{children}</div>
      <motion.div initial="hidden" animate={controls} variants={textVariants} className="hideText--overlay">
        {children.split(" ").map((char, index) => (
          <motion.span key={index} className="hideText--wrapper">
            <motion.span key={index} variants={charVariants}>
              {char}
            </motion.span>
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default HideText
