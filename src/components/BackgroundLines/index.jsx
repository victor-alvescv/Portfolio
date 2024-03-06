import { useEffect, useState } from "react"
import "./style.css"

const getRandomLineIndex = (currentLine) => {
  let randomLineIndex
  do {
    randomLineIndex = Math.floor(Math.random() * 12) + 1
  } while (randomLineIndex === currentLine)
  return randomLineIndex
}

const BackgroundLines = ({ light = false }) => {
  const [animatedLines, setAnimatedLines] = useState(null)

  const startRandomAnimations = () => {
    const randomLineIndex = getRandomLineIndex(animatedLines)
    setAnimatedLines(randomLineIndex)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      startRandomAnimations()
      setTimeout(() => {
        setAnimatedLines(null)
      }, 1500)
    }, 1600)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className={`backgroundLines ${light && "backgroundLines__light"}`}>
      {Array.from({ length: 12 }, (_, index) => (
        <div key={index + 1} className={`backgroundLines--line`}>
          <div className={`backgroundLines--line--glow  ${animatedLines === index + 1 ? "backgroundLines--line--glow__animate" : ""}`}></div>
        </div>
      ))}
    </div>
  )
}

export default BackgroundLines
