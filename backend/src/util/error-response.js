export default (err, res) => {
  if (err.message == 'DB') {
    res.status(600).json({
      success: false,
      message: '데이터베이스 에러',
    })
  } else if (err.message == 'parameter') {
    res.status(400).json({
      success: false,
      message: '파라미터 값이 잘못 되었습니다.',
    })
  } else if (err.message == 'DUPLICATE') {
    res.status(409).json({
      success: false,
      message: '중복된 데이터가 존재합니다.',
    })
  } else {
    res.status(500).json({
      success: false,
      message: '서버 내부 오류',
    })
  }
}
