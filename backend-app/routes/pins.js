const router = require("express").Router()
const Pin = require("../models/pin") // Pin model

// Create a pin
router.post("/", async (req, res) => {
  try {
    const newPin = new Pin(req.body)
    const savedPin = await newPin.save()
    res.status(201).json(savedPin) // Status 201 - resource created
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ message: err.message }) // Status 400 - validation error
    } else {
      res.status(500).json({ message: "Internal Server Error" }) // Status 500 - other errors
    }
  }
})

// Get all pins
router.get("/", async (req, res) => {
  try {
    const pins = await Pin.find()
    res.status(200).json(pins) // Status 200 - success
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" }) // Status 500 - errors
  }
})

module.exports = router
