import { useState, useEffect } from "react";
import "./style.css";
import BackgroundLines from "../BackgroundLines";
import Button from "../Button";
import MenuIcon from "../../assets/Icon/menu.svg";
import ArrowUpRightIcon from "../../assets/Icon/arrow-up-right.svg";
import headerVideo from "../../assets/headerVideo.webm";
import TextWriting from "../TextWriting";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ScrambleText from "../ScrambleText";
import Time from "../Time";
import NavMenu from "../NavMenu";

export default function Header() {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  const [hasAnimated, setHasAnimated] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleComplete = () => {
    setHasAnimated(true);
  };

  useEffect(() => {
    // Start animation when the component is in view
    if (inView && !hasAnimated) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const nameVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 20,
        duration: 1.5,
        delay: 2.85,
      },
    },
  };

  const opacityVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const blurVariants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  };

  const handleMenuToggle = () => {
    setMenuVisible((prev) => !prev);
  };

  return (
    <header ref={ref}>
      <NavMenu isVisible={menuVisible} toggleFunc={handleMenuToggle} />
      <BackgroundLines />
      <NavMenu />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={blurVariants}
        transition={{ duration: 1, delay: 0.5 }}
        className="header--menuBtn"
      >
        <Button icon={MenuIcon} onClick={handleMenuToggle} />
      </motion.div>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={blurVariants}
        transition={{ duration: 1, delay: 0.5 }}
        className="header--top"
      >
        <h3>
          <a
            href="https://github.com/victor-alvescv"
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <ScrambleText shuffle delay={0.5}>
              GITHUB
            </ScrambleText>
          </a>
          <span className="header--hash">{"//"}</span>
          <a
            href="https://www.linkedin.com/in/victor-alves-68538527b/"
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <ScrambleText shuffle delay={1}>
              LINKEDIN
            </ScrambleText>
          </a>
          <span className="header--hash">{"//"}</span>
          <a
            href="Resume.pdf"
            target={"_blank"}
            rel="noopener noreferrer"
          >
            <ScrambleText shuffle delay={1.5}>
              RESUME
            </ScrambleText>
          </a>
        </h3>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={blurVariants}
        transition={{ duration: 1, delay: 4 }}
        className="header--bottom"
      >
        <div>
          <h3>
            <ScrambleText shuffle delay={4}>
              intro
            </ScrambleText>{" "}
            <span className="header--hash">{"//"}</span>
          </h3>
          <p className="theme--detail">
            <ScrambleText shuffle delay={4}>
              Hey there, I'm Victor, a seasoned engineer who navigates intricate
              technical challenges daily. My goal is to relentlessly push the
              boundaries of web development, leveraging my evolving expertise to
              catalyze societal advancement through innovative technology
              solutions.
            </ScrambleText>
          </p>
        </div>

        <h3>
          <Time delay={4.0} />
        </h3>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={blurVariants}
        transition={{ duration: 1, delay: 4.5 }}
        className="header--center"
        onAnimationComplete={() => handleComplete()}
      >
        <a href="#contact" className="connect--button">
          <Button label="Let’s connect" icon={ArrowUpRightIcon} />
        </a>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={blurVariants}
        transition={{ duration: 1, delay: 2.85 }}
        className="header--right"
      >
        <h3>
          <span className="header--hash">{"//"}</span>{" "}
          <ScrambleText shuffle delay={2.9}>
            scroll
          </ScrambleText>{" "}
          <span className="header--hash">{"//"}</span>
        </h3>
      </motion.div>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={opacityVariants}
        transition={{ duration: 2, delay: 2.85 }}
        className="header--video"
      >
        <video src={headerVideo} autoPlay loop muted></video>
      </motion.div>

      <h1 className="header--name">
        <TextWriting controls={controls} text={"Victor Alves"} noblink />
        <br />
        <TextWriting
          controls={controls}
          delay={1.65}
          text={"Frontend"}
          noblink
        />{" "}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={nameVariants}
          className="header--name--sec"
        >
          <TextWriting
            controls={controls}
            delay={2.85}
            text={"Developer"}
            noblink
          />
          <div className="header--name--border">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </motion.div>
      </h1>
    </header>
  );
}
