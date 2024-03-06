import { useRef, useEffect } from "react"
import { motion, useSpring, useTransform } from "framer-motion"
import normalizeWheel from "normalize-wheel"
import { useRafLoop } from "react-use"
import { useWindowSize } from "@react-hook/window-size"
import "./style.css"

const MarqueeItem = (props) => {
  const { children, speed } = props

  const itemRef = useRef(null)
  const rectRef = useRef(null)
  const x = useRef(0)
  const [width, height] = useWindowSize()

  const setX = () => {
    if (!itemRef.current || !rectRef.current) {
      return
    }

    const xPercentage = (x.current / rectRef.current.width) * 100

    if (xPercentage < -100) {
      x.current = 0
    }

    if (xPercentage > 0) {
      x.current = -rectRef.current.width
    }

    itemRef.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`
  }

  useEffect(() => {
    if (itemRef.current) {
      rectRef.current = itemRef.current.getBoundingClientRect()
    }
  }, [width, height])

  const loop = () => {
    //Substracts the current x from the speed set by useSpring
    x.current -= speed.get()
    setX()
  }

  const [, loopStart] = useRafLoop(loop, false)

  useEffect(() => {
    loopStart()
  }, [])

  return (
    <motion.div className="interactiveMarquee--item" ref={itemRef}>
      {children}
    </motion.div>
  )
}

export const InteractiveMarquee = (props) => {
  const { speed = 1, threshold = 0.014, wheelFactor = 1.8, dragFactor = 1.2, children } = props

  const marqueeRef = useRef(null)
  const slowDown = useRef(false)
  const isScrolling = useRef(null)
  const constraintsRef = useRef(null)

  const x = useRef(0)
  const [wWidth] = useWindowSize()
  const speedSpring = useSpring(speed, {
    damping: 40,
    stiffness: 90,
    mass: 5,
  })

  const opacity = useTransform(speedSpring, [-wWidth * 0.05, 0, wWidth * 0.05], [1, 0, 1])
  const skewX = useTransform(speedSpring, [-wWidth * 0.05, 0, wWidth * 0.05], [1, 0, 1])

  const handleOnWheel = (e) => {
    const normalized = normalizeWheel(e)

    // This will use the wheel to speed up the timeline
    x.current = normalized.pixelY * wheelFactor

    // reset speed on scroll end
    if (isScrolling.current) {
      window.clearTimeout(isScrolling.current)
    }

    isScrolling.current = setTimeout(() => {
      speedSpring.set(speed)
    }, 30)
  }

  const handleDragStart = () => {
    slowDown.current = true
    marqueeRef.current.classList.add("interactiveMarquee--drag")
    speedSpring.set(0)
  }

  const handleOnDrag = (_, info) => {
    speedSpring.set(dragFactor * -info.delta.x)
  }

  const handleDragEnd = () => {
    slowDown.current = false
    marqueeRef.current.classList.remove("interactiveMarquee--drag")
    //rest to the original speed
    x.current = speed
  }

  const loop = () => {
    if (slowDown.current || Math.abs(x.current) < threshold) {
      return
    }

    x.current *= 0.66

    if (x.current < 0) {
      x.current = Math.min(x.current, 0)
    } else {
      x.current = Math.max(x.current, 0)
    }

    speedSpring.set(speed + x.current)
  }

  useRafLoop(loop)

  return (
    <>
      <motion.div style={{ opacity }} ref={constraintsRef} />
      <motion.div className="interactiveMarquee" ref={marqueeRef} style={{ skewX }} onWheel={handleOnWheel} drag="x" dragPropagation={true} dragConstraints={{ left: 0, right: 0 }} onDragStart={handleDragStart} onDrag={handleOnDrag} onDragEnd={handleDragEnd} dragElastic={0.000001}>
        <MarqueeItem speed={speedSpring}>{children}</MarqueeItem>
        <MarqueeItem speed={speedSpring}>{children}</MarqueeItem>
      </motion.div>
    </>
  )
}

export default InteractiveMarquee
