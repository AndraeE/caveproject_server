const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')

// @desc    Sign up NEW user
// @route   POST /api/users
// @access  Public
const signupUser = asyncHandler ( async (req, res) => {
  const { name, email, password, user_level } = req.body
  
	if(!name || !email || !password || !user_level) {
		res.status(400).json({error: 'Add required fields'})
	}
	
	// Check if user already exists
	const checkUserExists = await User.findOne({email})

	if(checkUserExists) {
		res.status(400).json({error: 'User already exists'})
	}
	
	// Password hashing
	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(password, salt)
	
	// Create User
	const user = await User.create({
		name,
		email,
		password: hashedPassword,
		user_level
	})

	if(user) {
		res.status(201).json({
			user,
			token: generateToken(user._id),
			message: 'User created'
		})
	} else {
		res.status(400).json({ message: 'Sign up failed'})
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
  signupUser,
  loginUser,
  getUser
}