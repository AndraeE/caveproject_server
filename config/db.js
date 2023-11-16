//database connection
const mongoose = require('mongoose')
  
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongoURI)
    console.log('MongoDB is connected...')
  } catch (error) {
    console.log('Database not connected...')
    console.error(error.message)
    process.exit(1)
  }
};
  
module.exports = connectDB;