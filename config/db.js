const mongoose = require('mongoose')

// when working with mongoose, we are working with promises
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB Connected: ${connect.connection.host}`)
    } catch(err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB