// server.js (entry point)
const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const { urlencoded } = require('body-parser')
const app = express()

// Connect database
connectDB()

// cors
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

// middleware
app.use(express.json())
app.use(urlencoded({ extended: false }))

app.get('/', (req, res) => res.send('Hello world!'))

// routes
app.use('/api/strains', require('./routes/strainRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

const port = process.env.PORT || 5050

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
});