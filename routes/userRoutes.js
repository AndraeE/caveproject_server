// routes/userRoutes
const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth')
const {
    signupUser,
    loginUser,
    getUser
} = require('../controllers/userController');

router.post('/', signupUser)
router.post('/login', loginUser)
router.get('/me', auth, getUser)


module.exports = router