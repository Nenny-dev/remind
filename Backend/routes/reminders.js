const express = require("express");
const router = express.Router();
const Reminder = require("/Remindme/backend/models/Reminder");

// Add Reminder
router.post("/add", async (req, res) => {
  const { userId, task, date, time } = req.body;
  try {
    const reminder = new Reminder({ userId, task, date, time });
    await reminder.save();
    res.status(201).json(reminder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get Reminders for a User
router.get("/:userId", async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.params.userId });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Reminder
router.delete("/:id", async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: "Reminder deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;