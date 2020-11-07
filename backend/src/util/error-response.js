import statusCode from './statusCode'

export default (err, res) => {
  if (err.message == 'DB') {
    res.status(statusCode.DB_ERROR).json({
      success: false,
      message: '데이터베이스 에러',
    })
  } else if (err.message == 'parameter') {
    res.status(statusCode.BAD_REQUEST).json({
      success: false,
      message: '파라미터 값이 잘못 되었습니다.',
    })
  } else if (err.message == 'DUPLICATE') {
    res.status(statusCode.CONFLICT).json({
      success: false,
      message: '중복된 데이터가 존재합니다.',
    })
  } else {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '서버 내부 오류',
    })
  }
}
