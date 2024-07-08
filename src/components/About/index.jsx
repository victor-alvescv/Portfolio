import { useState, useEffect } from "react";
import "./style.css";
import BackgroundLines from "../BackgroundLines";
import ScrambleText from "../ScrambleText";
import InteractiveMarquee from "../InteractiveMarquee";
import ParaWriting from "../ParaWriting";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
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

  const positionVariant = {
    hidden: { x: "100%" },
    visible: {
      x: "60px",
      transition: {
        ease: [0.5, 1, 0.89, 1],
        duration: 1,
        delay: 0,
      },
    },
  };

  const opacityVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section className="about" id="about">
      <BackgroundLines light />
      <div ref={ref} className="about--grid">
        <div className="about--bio">
          <h2>
            <ParaWriting
              stagger={0.08}
              text={
                "I am a dedicated software engineer who is deeply passionate about creating "
              }
              sec={"dynamic and impactful websites"}
            />
          </h2>
        </div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={opacityVariant}
          transition={{ duration: 1, delay: 1.5 }}
          className="about--title"
        >
          <h3 className="theme--text--dark">
            <ScrambleText shuffle delay={1.5}>
              02
            </ScrambleText>{" "}
            <span className="hash">{"//"}</span>{" "}
            <ScrambleText shuffle delay={1.5}>
              about
            </ScrambleText>
          </h3>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={opacityVariant}
          transition={{ duration: 1, delay: 2 }}
          onAnimationComplete={() => handleComplete()}
          className="about--detail"
        >
          <p className="theme--detail--dark">
            <ScrambleText delay={2}>
              As a Frontend Developer, I embrace the opportunity to
              tackle highly challenging engineering problems on a daily basis.
              Continuously refining my skills and knowledge, I am driven by a
              passion for developing innovative technologies that not only meet
              client needs but also contribute to the betterment of society.
            </ScrambleText>
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={positionVariant}
          className="about--marquee"
        >
          <h1 draggable="false">
            <InteractiveMarquee wheelFactor={0} speed={1.3}>
              <span>ABOUT Victor Alves</span>
              <span>ABOUT Victor Alves</span>
              <span>ABOUT Victor Alves</span>
              <span>ABOUT Victor Alves</span>
              <span>ABOUT Victor Alves</span>
            </InteractiveMarquee>
          </h1>
        </motion.div>
      </div>
    </section>
  );
}
