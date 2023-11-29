// routes/userRoutes
const express = require('express');
const router = express.Router();
const cors = require('cors')
const { auth } = require('../middleware/auth')
const {
	test,
  signupUser,
  loginUser,
  logoutUser,
  getUser
} = require('../controllers/userController');

// auth routes
router.get('/', test)
router.post('/', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)

// authenticated/protected routes
router.get('/profile', auth, getUser)


module.exports = router