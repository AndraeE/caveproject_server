const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const { generateToken } = require('../utils/helpers')

// @desc    for testing purposes
// @route   GET /users
// @access  Public
const test = (req,res) => {
	res.json('Test is working.')
}

// @desc    Sign up NEW user
// @route   POST /users
// @access  Public
const signupUser = asyncHandler ( async (req, res) => {
	try {
		const { name, email, password, institution, address, user_level } = req.body
		
		// Check required fields
		if(!name || !email || !password || !user_level) {
			return res.json({ error: 'Add required fields' })
			// throw new Error('Add required fields')
		}
		
		// Check password length
		if(password.length < 6) {
			return res.json({ error: 'Password should be at least 6 characters long' })
			// throw new Error('Password should be at least 6 characters long')
		}
		
		// Check if user already exists
		const exist = await User.findOne({email})

		if(exist) {
			return res.json({ error: 'Email already exists' })
			// throw new Error('Email already exists')
		}
		
		// Password hashing
		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)
		
		// Create User
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			institution,
			address,
			user_level
		})

		if(user) {
			const _token = generateToken(res, user._id)

			return res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				user_level: user.user_level,
				token: _token,
				message: 'User account successfuly created'
			})
		} else {
			return res.json({ message: 'Sign up failed' })
		}
	} catch (error) {
		console.log(error)
	}
  
})


// @desc    Login/authenticate user
// @route   POST /users/login
// @access  Public
const loginUser = asyncHandler ( async (req, res) => {
	try {
		const { email, password } = req.body

		// Check if user (email) exists
		const user = await User.findOne({ email })
		if(!user) {
			return res.json({ error: 'No user found' })
		}

		// Check if passwords match
		if( await bcrypt.compare(password, user.password) ) {
			const _token = generateToken(res, user._id)

			return res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				user_level: user.user_level,
				token: _token,
				message: 'Logged in successfuly'
			})
		} else {
			return res.json({ error: 'Invalid credentials' })
		}

	} catch (error) {
		console.log(error)
	}
})

// @desc    Logout user, clear cookies
// @route   POST /users/logout
// @access  Private
const logoutUser = asyncHandler ( async (req, res) => {
	res.clearCookie('jwt', {
		httpOnly: true,
		expires: new Date(0),
	})
	
	return res.json({ message: 'Logged out successfully' });
})

// @desc    Get user data
// @route   GET /users/profile
// @access  Private
const getUser = asyncHandler ( async (req, res) => {
	// const user = await User.findOne({ email })
	const user = await User.findById(req.user._id);

	if(user) {
		return res.json({
      user
    })
	} else {
		return res.json({ error: 'User not found' })
	}
})


module.exports = {
	test,
  signupUser,
  loginUser,
	logoutUser,
  getUser
}