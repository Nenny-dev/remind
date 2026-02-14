const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  task: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  sent: { type: Boolean, default: false }, // new field to track sent emails
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Reminder", ReminderSchema);