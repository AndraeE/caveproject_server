const jwt = require('jsonwebtoken')

// JWT Generation
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_CODE, {
    expiresIn: '1d',
  })
  
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  })

	return token
}

module.exports = {
	generateToken
}