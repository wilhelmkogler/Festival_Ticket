const express = require("express");
const router = express.Router();
const Festival = require("../models/Festival");

// GET all festivals
router.get("/", async (req, res) => {
  const festivals = await Festival.find();
  res.json(festivals);
});

// POST new festival
router.post("/", async (req, res) => {
  try {
    const newFestival = new Festival(req.body);
    const saved = await newFestival.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
