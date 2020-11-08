const textEncoder = new TextEncoder()

const verifyTextLength = (text, length) => {
  if (textEncoder.encode(text).length <= length) return true
  return false
}

export { verifyTextLength }
