import { useState, useEffect } from "react"
import ScrambleText from "../ScrambleText"

export default function Time() {
  // use Intl.DateTimeFormat().resolvedOptions(); to get your own timeZone too
  const myTimeZone = "Australia/Sydney"
  const usersTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const myTimeZoneText = myTimeZone.split("/")[1]
  const userTimeZoneText = usersTimeZone.split("/")[1]

  const [myFormatttedTime, setMyFormattedTime] = useState("")
  const [userFormattedTime, setUserFormattedTime] = useState("")

  const getFormattedTime = (timeZone) => {
    const options = {
      timeZone: timeZone,
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }
    return new Intl.DateTimeFormat("en-US", options).format(new Date())
  }

  const updateClocks = () => {
    setMyFormattedTime(getFormattedTime(myTimeZone))
    setUserFormattedTime(getFormattedTime(usersTimeZone.timeZone))
  }

  useEffect(() => {
    updateClocks()
  }, [])

  useEffect(() => {
    // Update every second
    const intervalId = setInterval(updateClocks, 1000)

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId)

    // Initial clock update
  }, [])

  return (
    <>
      <ScrambleText shuffle delay={4.2}>
        {myTimeZoneText}
      </ScrambleText>{" "}
      {myFormatttedTime}
      {myTimeZoneText !== userTimeZoneText && (
        <>
          <span className="header--hash">{"//"}</span>{" "}
          <ScrambleText shuffle delay={4.2}>
            {userTimeZoneText}
          </ScrambleText>{" "}
          {userFormattedTime}
        </>
      )}
    </>
  )
}
