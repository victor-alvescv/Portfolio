import { AnimatePresence, motion } from "framer-motion"
import "./style.css"
import ScrambleText from "../ScrambleText"
import BackgroundLines from "./../BackgroundLines/index"

export default function NavMenu({ isVisible, toggleFunc }) {
  const translateVariants = {
    initial: { translateX: "-100%" },
    animate: { translateX: "0%" },
    exit: { translateX: "100%" },
  }

  const menuItemsArr = [
    {
      text: "about",
    },
    {
      text: "tech",
    },
    {
      text: "projects",
    },
    {
      text: "resume",
    },
    {
      text: "contact",
    },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div className="nav--menu" initial="initial" animate="animate" exit="exit" transition={{ duration: 1 }} variants={translateVariants}>
            <BackgroundLines />
            {menuItemsArr.map((item, i) => (
              <a className="nav--link" href={`#${item.text}`} key={item} onClick={toggleFunc}>
                <ScrambleText shuffle delay={(i + 1) / 2}>
                  {item.text}
                </ScrambleText>
              </a>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
