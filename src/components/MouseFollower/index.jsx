import { useState, useEffect } from "react"
import "./style.css"

export default function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    // Add mousemove event listener
    window.addEventListener("mousemove", handleMouseMove)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, []) // Empty dependency array ensures that this effect runs only once when the component mounts

  return (
    <div className="MouseFollower" style={{ left: mousePosition.x, top: mousePosition.y }}>
      <div></div>
    </div>
  )
}
