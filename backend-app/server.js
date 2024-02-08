const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

//initialize the app
const app = express()
//initialize the port
const port = 8800
// dotenv config
dotenv.config()

/*db connection
MONGO_URL = 'mongodb+srv://user:1234@cluster0.lbbedwq.mongodb.net/?retryWrites=true&w=majority'*/
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log(err));

app.listen(port,()=>{
    console.log("Backend is running")
})