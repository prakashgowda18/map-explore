const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")

// Create express app
const app = express()

// dotenv config
dotenv.config()

//initialize the port
const port = process.env.PORT

/*db connection
MONGO_URL is declared at the dotenv '*/
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected!"))
.catch(err => {
    console.error("MongoDB connection error:", err);
    // Terminate the application if unable to connect MongoDB
    process.exit(1);
  });

app.listen(port,()=>{
    console.log("Backend is Running")
})