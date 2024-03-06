import { motion } from "framer-motion"
import "./style.css"
import FadeList from "../FadeList"
import ScrambleText from "../ScrambleText"

export default function ResumeCard({ experienceList, controls, delay }) {
  const lineVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        type: "spring",
        stiffness: 20,
        duration: 2,
        delay: delay,
      },
    },
  }
  return (
    <div className="resumeCard">
      <motion.div initial="hidden" animate={controls} variants={lineVariants} className="resume--line"></motion.div>

      <div className="resumeCard--body">
        <div className="resumeCard--body--left">
          <h4>
            <ScrambleText shuffle delay={delay}>
              {experienceList.company}
            </ScrambleText>
          </h4>
          <p>
            <ScrambleText shuffle delay={delay}>
              {experienceList.role}
            </ScrambleText>
          </p>
        </div>

        <div className="resumeCard--body--center">
          <FadeList delay={delay} controls={controls} data={experienceList.resps} />
        </div>

        <div className="resumeCard--body--right">
          <h4>
            <ScrambleText delay={delay}>{experienceList.date}</ScrambleText>
          </h4>
        </div>
      </div>
    </div>
  )
}
