import { useState, useEffect } from "react";
import "./style.css";
import BackgroundLines from "../BackgroundLines";
import WorkCard from "../WorkCard";
import ScrambleText from "../ScrambleText";
import ParaWriting from "../ParaWriting";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import work1 from "../../assets/Images/work1.png";
import work2 from "../../assets/Images/work2.png";
import work3 from "../../assets/Images/work3.png";

export default function Projects() {
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

  const works = [
    {
      client: "Frontend Simplified",
      link: (
        <a
          className="works__links"
          target="_blank"
          href="https://summarist-three.vercel.app"
        >
          LINK
        </a>
      ),
      year: "2023",
      img: work1,
      title: "Building from the ground up a book store",
      detail:
        `Summarist upgrades online libraries with visuals and user-friendly features. It provides a wide book selection via APIs and ensures smooth login, registration, and secure payments. This project highlights my focus on innovation and user satisfaction.`,
    },
    {
      client: "Frontend Simplified",
      link: (
        <a
          className="works__links"
          target="_blank"
          href="https://victor-internship.vercel.app"
        >
          LINK
        </a>
      ),
      year: "2023",
      img: work2,
      title: "Creating the future as a shop",
      detail:
        "Introducing Ultraverse, a futuristic NFT marketplace simulation. It offers sleek design, curated NFTs, and transparent pricing. Ultraverse aims to redefine digital ownership, showcasing my dedication to pioneering technology and user experience.",
    },
    {
      client: "Prifina",
      link: (
        <a
          className="works__links"
          target="_blank"
          href="https://air-wise.vercel.app"
        >
          LINK
        </a>
      ),
      year: "2023",
      img: work3,
      title: "Information, weather and health",
      detail:
        "Airwise, the company's standout project, was developed by a team of four individuals in just three months, without any financial investment. It's a platform offering comprehensive health and weather information. This project underscores my teamwork skills, delivering high-quality results quickly, fueling my confidence in future endeavors.",
    },
  ];

  const opacityVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <section ref={ref} className="projects" id="projects">
      <BackgroundLines />
      <div className="background--glow"></div>

      <div className="projects--grid">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={opacityVariant}
          transition={{ duration: 1, delay: 0.5 }}
          className="projects--grid--title"
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

        <div className="projects--grid--content">
          <div className="projects--grid--content--heading">
            <h2>
              <ParaWriting stagger={0.08} text={"My "} sec={"Works"} />
            </h2>
          </div>
          <div className="projects--grid--content--works">
            {works.map((item, index) => {
              return (
                <WorkCard
                  item={item}
                  key={index}
                  // delay={0.1 * index + 1}
                  // controls={controls}
                />
              );
            })}
          </div>
        </div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={opacityVariant}
          transition={{ duration: 1, delay: 1 }}
          onAnimationComplete={() => handleComplete()}
          className="projects--grid--detail"
        >
          <p className="theme--detail">
            <ScrambleText delay={1}>
              Explore an immersive collection within my curated portfolio, where
              every line of code reveals a compelling narrative of ingenious
              problem-solving, boundless creativity, and unparalleled technical
              finesse.
            </ScrambleText>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
