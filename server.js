// server.js (entry point)

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();


// Connect database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// middleware
app.use(express.json())

app.get('/', (req, res) => res.send('Hello world!'));

// routes
app.use('/api/strains', require('./routes/strainRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

const port = process.env.PORT || 5050;

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
});