import { Cookies } from 'react-cookie'

const unitsOfTime = { seconds: 60, minutes: 60, hours: 24 }
const cookie = new Cookies()
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
  const [year, month, day] = date.split(/[- T]/, 3)
  return `Due by ${monthString[parseInt(month)]} ${day}, ${year}`
}

const getContrast = hexColor => {
  if (hexColor.startsWith('#')) hexColor = hexColor.slice(1)
  if (hexColor.length === 3)
    hexColor = hexColor
      .split('')
      .map(hex => hex + hex)
      .join('')
  return getContrastFromRGB(...hexToRGB(hexColor)) >= 128 ? 'black' : 'white'
}

const getContrastFromRGB = (r, g, b) => (r * 299 + g * 587 + b * 114) / 1000

const hexToRGB = hexColor => [
  parseInt(hexColor.slice(0, 2), 16),
  parseInt(hexColor.slice(2, 4), 16),
  parseInt(hexColor.slice(4, 6), 16),
]

const textEncoder = new TextEncoder()

const verifyTextLength = (text, length) => {
  if (textEncoder.encode(text).length <= length) return true
  return false
}

const getParsedCookie = key => cookie.get('userData')[key]

export {
  getTimePassedFromNow,
  getMilestoneDateFormat,
  getContrast,
  verifyTextLength,
  getParsedCookie,
}
