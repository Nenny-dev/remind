require("dotenv").config();
const express = require("express");
const { connectDB } = require("./db");

const app = express();
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

// test route (VERY IMPORTANT)
app.post("/test-user", async (req, res) => {
    res.json({ message: "Test route works" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});