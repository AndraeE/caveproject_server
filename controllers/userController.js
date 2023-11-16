const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

// @desc    for testing purposes
// @route   GET /api/users
// @access  Public
const test = (req,res) => {
	res.json('Test is working.')
}

// @desc    Sign up NEW user
// @route   POST /api/users
// @access  Public
const signupUser = asyncHandler ( async (req, res) => {
	try {
		const { name, email, password, institution, address, user_level } = req.body
		
		// Check required fields
		if(!name || !email || !password || !user_level) {
			res.json({error: 'Add required fields'})
		}
		
		// Check password length
		if(password.length < 6) {
			res.json({ error: 'Password should be at least 6 characters long' })
		}
		
		// Check if user already exists
		const exist = await User.findOne({email})

		if(exist) {
			res.json({error: 'Email already exists'})
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
			res.json({
				token: generateToken(user._id),
				message: 'User created'
			})
		} else {
			res.json({ message: 'Sign up failed'})
		}
	} catch (error) {
		console.log(error)
	}
  
})


// @desc    Login/authenticate user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler ( async (req, res) => {
  const { email, password } = req.body

	// Check User email
	const user = await User.findOne({ email })

	if(user && ( await bcrypt.compare(password, user.password))) {
		res.status(201).json({
			user,
			token: generateToken(user._id),
			message: 'User log in'
		})
	} else {
		res.status(400).json({ message: 'Invalid credentials' })
	}
})


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getUser = asyncHandler ( async (req, res) => {
	// const user = await User.findOne({ email })
  
	res.status(200).json(
		req.user
	)
})

// JWT Generation
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET_CODE, {
		expiresIn: '15d',
	})
}


module.exports = {
	test,
  signupUser,
  loginUser,
  getUser
}