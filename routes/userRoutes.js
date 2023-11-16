// routes/userRoutes
const express = require('express');
const router = express.Router();
const cors = require('cors')
// const { auth } = require('../middleware/auth')
const {
	test,
  signupUser,
  loginUser,
  getUser
} = require('../controllers/userController');

// middleware
router.use(
	cors({
		credentials: true,
		origin: 'http://localhost:5173'
	})
)

router.get('/', test)
router.post('/', signupUser)
router.post('/login', loginUser)
router.get('/me', getUser)


module.exports = router