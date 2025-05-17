const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const festivalRoutes = require("./routes/festivals");
app.use("/api/festivals", festivalRoutes);

const Festival = require("./models/Festival");

app.get("/api/festival/:id", async (req, res) => {
  try {
    const festival = await Festival.findById(req.params.id);
    if (!festival) return res.status(404).json({ error: "Festival not found" });
    res.json(festival);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
