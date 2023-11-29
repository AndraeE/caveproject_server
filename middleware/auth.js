const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const auth = asyncHandler( async (req, res, next) => {
	let token

	if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			// Get token from header
			token = req.headers.authorization.split(' ')[1]

			// Verify the token
			const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE)

			// Get user from the token
			req.user = await User.findById(decoded.userId).select('-password')

			next()
		} catch (error) {
			console.log(error)
			res.status(401).json({ message: 'Not authorized' })
		}
	}

	if(!token) {
		res.status(401).json({ message: 'No token. Not authorized.' })
	}
})

module.exports = {
	auth
}