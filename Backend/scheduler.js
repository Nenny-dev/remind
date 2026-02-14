const cron = require("node-cron");
const { getDB } = require("./db");
const sendReminderEmail = require("./utils/sendemail");

cron.schedule("* * * * *", async () => {
  console.log("Checking for due reminders...");
  await sendReminderEmail(); // The function handles the DB query itself
});
  const db = getDB();
  const now = new Date();

  const reminders = await db.collection("reminders").find({
    remindAt: { $lte: now },
    sent: false
  }).toArray();

  for (let reminder of reminders) {
    await sendReminderEmail(reminder.userEmail, reminder.task);

    await db.collection("reminders").updateOne(
      { _id: reminder._id },
      { $set: { sent: true } }
    );

    console.log("Reminder email sent to:", reminder.userEmail);
  }