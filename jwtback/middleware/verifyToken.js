import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  console.log(req.headers.authorization)
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
    return next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(419).json({
        resultCode: 419,
        meesage: "토큰 만료"
    });
  }
  return res.status(401).json({
      resultCode: 401,
      message: "토큰이 유효하지 않습니다."
    })
  }   
}