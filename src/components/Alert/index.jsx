import { AnimatePresence, motion } from "framer-motion"

import "./style.css"

const Alert = ({ isVisible, text, variant = "success" }) => {
  const translateVariants = {
    initial: { translateY: "100%", opacity: 0, translateX: "-50%" },
    animate: { translateY: "0%", opacity: 1, translateX: "-50%" },
    exit: { translateY: "-100%", opacity: 0, translateX: "-50%" },
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div className="alert" initial="initial" animate="animate" exit="exit" style={{ backgroundColor: `${variant === "success" ? "green" : "red"}` }} transition={{ duration: 1 }} variants={translateVariants}>
          <p>{text}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Alert
