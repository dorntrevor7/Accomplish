const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo DB Connceted ${conn.connection.host}`.cyan)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDB