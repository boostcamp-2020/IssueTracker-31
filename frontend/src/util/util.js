const unitsOfTime = { seconds: 60, minutes: 60, hours: 24 }

const getTimePassedFromNow = time => {
  let second = (new Date().getTime() - new Date(time).getTime()) / 1000
  for (const [key, value] of Object.entries(unitsOfTime)) {
    if (second / value < 1) return `${Math.floor(second)} ${key} ago`
    second /= value
  }
  return `${Math.floor(second)} days ago`
}

export { getTimePassedFromNow }
