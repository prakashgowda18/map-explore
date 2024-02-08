const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 8800



app.listen(port,()=>{
    console.log("Backend is running")
})