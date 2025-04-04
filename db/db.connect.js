const mongoose = require("mongoose")
require("dotenv").config()

const mongoUri = process.env.MONGODB

const initializeDatabase = async () => {
    try{
        const connection = await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        if(connection){
            console.log("Connected Successfully.")
        }
    } catch (error){
        console.log("Connection Failed.")
    }
}

module.exports = {initializeDatabase}