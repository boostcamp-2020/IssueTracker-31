import resMessage from './resMessage'
import statusCode from './statusCode'
const textEncoder = new TextEncoder()

const verifyTextLength = (text, length) => {
  if (textEncoder.encode(text).length <= length) return true
  return false
}

const verifyRequiredParams = (...params) => {
  for (const param of params)
    if (!param)
      throw { status: statusCode.BAD_REQUEST, message: resMessage.OUT_OF_VALUE }
}

export { verifyTextLength, verifyRequiredParams }
