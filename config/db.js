const mongoose = require('mongoose')

console.log(process.env.MONGO_URI)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("server is connected successfully 😊")
    } catch (error) {
        console.log("Error connecting to mdb cloud :(", error)
    }
};

module.exports = connectDB