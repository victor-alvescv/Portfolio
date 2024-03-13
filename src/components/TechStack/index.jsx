import { useState, useEffect } from "react";
import "./style.css";
import BackgroundLines from "../BackgroundLines";
import TechCard from "../TechCard";
import ScrambleText from "../ScrambleText";
import ParaWriting from "../ParaWriting";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import techs from "../../constants/techs";

export default function TechStack() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleComplete = () => {
    setHasAnimated(true);
  };

  useEffect(() => {
    // Start animation when the component is in view
    if (inView && !hasAnimated) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const opacityVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section ref={ref} className="techStackSec" id="tech">
      <BackgroundLines />

      <div className="techStackSec--head">
        <div className="techStackSec--head--heading">
          <h2>
            <ParaWriting stagger={0.08} text={"Tech-"} sec={"Stack"} />
          </h2>
        </div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={opacityVariant}
          transition={{ duration: 1, delay: 0.5 }}
          className="techStackSec--head--title"
        >
          <h3 className="theme--text">
            <ScrambleText shuffle delay={0.5}>
              03
            </ScrambleText>{" "}
            <span className="hash">{"//"}</span>{" "}
            <ScrambleText shuffle delay={0.5}>
              Expertise
            </ScrambleText>
          </h3>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={opacityVariant}
          transition={{ duration: 1, delay: 1 }}
          onAnimationComplete={() => handleComplete()}
          className="techStackSec--head--detail"
        >
          <p className="theme--detail">
            <ScrambleText delay={1}>
              Explore the essential technologies that form the backbone of my
              skill set: HTML5, CSS3, JavaScript, TypeScript, React, Redux,
              Firebase, and Sass. With meticulous attention to detail, I
              carefully select and adeptly utilize each tool to create seamless,
              modern web experiences that captivate and engage users.
            </ScrambleText>
          </p>
        </motion.div>
      </div>

      <div className="techStackSec--grid">
        {techs.map((item, index) => {
          return (
            <TechCard
              item={item}
              key={index}
              delay={0.1 * index + 1}
              controls={controls}
            />
          );
        })}
      </div>
    </section>
  );
}
