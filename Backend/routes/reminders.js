const express = require("express");
const router = express.Router();
const { getDB } = require("../db");

router.post("/add", async (req, res) => {
  try {
    const { userEmail, username, task, date, time } = req.body;

    if (!userEmail ||!username || !task || !date || !time) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Combine date + time into a real JS Date object
    const remindAt = new Date(`${date}T${time}`);

    const db = getDB();

    const reminder = {
      email: userEmail,       // standard field
      name: username,
      message: task,
      date: date,   
      time: time,       // standard field
      remindAt,               // real datetime
      sent: false,
      createdAt: new Date(),
    };

    const result = await db.collection("reminders").insertOne(reminder);

    console.log("Saved reminder:", result.insertedId);

    res.json({ success: true});

  } catch (err) {
    console.error("Add reminder failed:", err);
    res.status(500).json({  error: err.message  });
  }
});


// Get reminders
router.get("/:email", async (req, res) => {
  const db = getDB();
  const reminders = await db
    .collection("reminders")
    .find({ email: req.params.email })
    .toArray();

  res.json(reminders);
});

// Delete reminder
router.delete("/:id", async (req, res) => {
  const db = getDB();
  await db.collection("reminders").deleteOne({
    _id: new (require("mongodb").ObjectId)(req.params.id)
  });

  res.json({ message: "Reminder deleted" });
});

module.exports = router;