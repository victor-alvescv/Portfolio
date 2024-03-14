import { useEffect, useState } from "react";
import "./style.css";
import TextWriting from "../TextWriting";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import FadeText from "../FadeText";
import HideText from "../HideText";

export default function TechCard({ item }) {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [hasAnimated, setHasAnimated] = useState(false);
  const delay = 0;

  const handleComplete = () => {
    setHasAnimated(true);
  };

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const opacityVariants = {
    hidden: { opacity: 0, mixBlendMode: "color-dodge" },
    visible: { opacity: 1, mixBlendMode: "normal" },
  };

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
  };

  return (
    <div ref={ref} className="workCard">
      <div className="workCard--head">
        <h3>
          <TextWriting
            delay={delay}
            nocursor
            controls={controls}
            stagger={0.08}
            text={item.client}
          />
          <span data-aos="fade-in"
            data-aos-delay="500"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true" style={{ color: "gray", fontWeight: "bold" }}>//</span>
          <p
            data-aos="fade-in"
            data-aos-delay="800"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-mirror="true"
            data-aos-once="true"
          >
            {item.link}
          </p>
        </h3>
        <h3>
          <TextWriting
            delay={delay}
            nocursor
            controls={controls}
            stagger={0.08}
            text={item.year}
          />
        </h3>
      </div>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={lineVariants}
        className="workCard--line"
      ></motion.div>

      <div className="workCard--body">
        <motion.span
          initial="hidden"
          animate={controls}
          variants={opacityVariants}
          transition={{ duration: 2, delay: 0.5 }}
          onAnimationComplete={() => handleComplete()}
        >
          <img src={item.img} alt="" className="work--img" />
        </motion.span>
        <h1>
          <HideText controls={controls} delay={delay}>
            {item.title}
          </HideText>
        </h1>
        <p>
          <FadeText controls={controls} delay={delay}>
            {item.detail}
          </FadeText>
        </p>
      </div>
    </div>
  );
}
