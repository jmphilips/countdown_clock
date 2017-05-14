// clocks.js

let yearHtml     = document.getElementById("year")
let monthHtml    = document.getElementById("month")
let dateHtml     = document.getElementById("date")
let hourHtml     = document.getElementById("hour")
let minuteHtml   = document.getElementById("minute")
let meridiemHtml = document.getElementById("meridiem")

let countdownDisplay = document.getElementById("countdownDisplay")

let today = new Date()
yearHtml.defaultValue     = today.getUTCFullYear()
monthHtml.defaultValue    = (today.getMonth() + 1)
dateHtml.defaultValue     = today.getDate()
hourHtml.defaultValue     = today.getHours() 

leftPadZero = num => {
  return num.toString().length < 2 ? ` 0${num}` : ` ${num}`
}

returnCurrentTime = () => {
  return (new Date().getTime())
}

returnTimeDistance = time => {
  return time - returnCurrentTime()
}

calculateIntervals = milliseconds => {
  return (milliseconds / 100)
}

changeColor = (redValue, greenValue) => {
  document.body.style.backgroundColor = `rgb(${redValue}, ${greenValue}, 0)`
}

retrieveFinalDate = () => {
  let year     = yearHtml.value
  let month    = (monthHtml.value - 1)
  let date     = dateHtml.value
  let hour     = hourHtml.value
  let minute   = minuteHtml.value
  let meridiem = meridiemHtml.value

  if (meridiem === "pm") {
    hour = parseInt(hour) + 12
  }

  return new Date(year, month, date, hour, minute).getTime()
}

calculateDistance = distance => {
  let finalString = ""

  let daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24))
  let hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  let minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  let secondsLeft = Math.floor(distance % (1000 * 60) / 1000)

  if (daysLeft != 0) {
    finalString += `${daysLeft}:days,`
  }

  finalString += leftPadZero(hoursLeft)   + " hours,"
  finalString += leftPadZero(minutesLeft) + " minutes,"
  finalString += leftPadZero(secondsLeft) + " seconds remaining"

  if (distance < 1000) {
    finalString = "00 hours, 00 minutes, 00 seconds remaining"
    changeColor(150, 0)
  }

  countdownDisplay.innerHTML = finalString
}

startCountdown = () => {
  const finalDate = retrieveFinalDate()
  let greenValue = 100
  let redValue = 0

  if (returnTimeDistance(finalDate) > 0) {
    document.getElementById("start-countdown-button").innerHTML = ""
    const countdownTimer = setInterval(() => {
      if (returnTimeDistance(finalDate) < 1000) {
        clearInterval(countdownTimer)
      }

      calculateDistance(returnTimeDistance(finalDate))

    }, 1000)

    const colorChanger = setInterval(() => {

      if (returnTimeDistance(finalDate) < 5000) {
        clearInterval(colorChanger)
      }

      redValue += 1
      greenValue -= 1
      changeColor(redValue, greenValue)

    }, calculateIntervals(returnTimeDistance(finalDate)))

  } else {

    countdownDisplay.innerHTML = "We've gotta go back, Marty. Try a time in the future."
  }
}
