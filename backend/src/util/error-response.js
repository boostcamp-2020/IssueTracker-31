export default (err, res) => {
  if (err.message == 'DB') {
    res.status(600).json({
      succes: false,
      message: '데이터베이스 에러',
    })
  } else if (err.message == 'parameter') {
    res.status(400).json({
      succes: false,
      message: '파라미터 값이 잘못 되었습니다.',
    })
  } else {
    res.status(500).json({
      succes: false,
      message: '서버 내부 오류',
    })
  }
}
