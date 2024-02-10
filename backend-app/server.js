const express = require("express")
const mongoose = require("mongoose")
const cors = require('cors')
const dotenv = require("dotenv")
const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")


// Create express app
const app = express()

// Enable CORS for all origins
app.use(cors())

// dotenv config
dotenv.config()

// Parse JSON bodies
app.use(express.json());

//initialize the port
const port = process.env.PORT || 8800

/*db connection
MONGO_URL is declared at the dotenv '*/
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB connected!"))
.catch(err => {
    console.error("MongoDB connection error:", err);
    // Terminate the application if unable to connect MongoDB
    process.exit(1);
  });

    // API Routes
    app.use("/api/pins", pinRoute)
    app.use("/api/user", userRoute)

app.listen(port,()=>{
    console.log("Backend is Running")
})