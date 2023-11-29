// server.js (entry point)
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')


// Connect database
connectDB()

// cors
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler)

app.get('/', (req, res) => res.send('Hello world!'))

// routes
app.use('/strains', require('./routes/strainRoutes'))
app.use('/users', require('./routes/userRoutes'))

const port = process.env.PORT || 5050

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
});