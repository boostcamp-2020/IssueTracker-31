const unitsOfTime = { seconds: 60, minutes: 60, hours: 24 }

const getTimePassedFromNow = time => {
  let second = (new Date().getTime() - new Date(time).getTime()) / 1000
  for (const [key, value] of Object.entries(unitsOfTime)) {
    if (second / value < 1) return `${Math.floor(second)} ${key} ago`
    second /= value
  }
  return `${Math.floor(second)} days ago`
}

const getMilestoneDateFormat = date => {
  const monthString = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December',
  }
  const [year, month, day] = date.split(/[- ]/, 3)
  return `Due by ${monthString[parseInt(month)]} ${day}, ${year}`
}

export { getTimePassedFromNow, getMilestoneDateFormat }
