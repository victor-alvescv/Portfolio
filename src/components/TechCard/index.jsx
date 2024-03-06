import "./style.css"
import Icon from "../Icon"
import TextWriting from "../TextWriting"
import ScrambleText from "../ScrambleText"
import { motion } from "framer-motion"

export default function TechCard({ item, delay, controls }) {
  const blurVariants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  }

  return (
    <div className="techCard">
      <motion.div initial="hidden" animate={controls} variants={blurVariants} transition={{ duration: 0.5, delay: delay }}>
        <Icon img={item.icon} />
      </motion.div>
      <h3>
        <TextWriting delay={delay} nocursor controls={controls} stagger={0.08} text={item.title} />
      </h3>
      <p>
        <ScrambleText delay={delay}>{item.detail}</ScrambleText>
      </p>
    </div>
  )
}
