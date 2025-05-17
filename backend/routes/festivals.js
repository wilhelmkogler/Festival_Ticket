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

// GET single festival by ID
router.get("/:id", async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);
    if (!festival) return res.status(404).json({ error: "Festival not found" });
    res.json(festival);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
