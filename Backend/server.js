require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
const reminderRoutes = require("./routes/reminders");
const authRoutes = require("./routes/auth");
const cron = require("node-cron");
const sendEmailReminder = require("./utils/sendemail"); // your email function


// require("./scheduler");


const app = express();

app.use(cors({
  origin: "https://remind-me-task.netlify.app"
}));
app.use(express.json());

// use routes
app.use("/auth", authRoutes);
app.use("/reminders", reminderRoutes);

app.get("/", (req, res) => {
  res.send("Backend running successfully");
});

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();

    // Start server after DB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);

  
   // Cron job: runs every minute for testing
   cron.schedule("* * * * *", async () => {
    console.log("Running reminder cron job...");
    await sendEmailReminder();
  });

  // Once tested, change to daily 9AM:
  // cron.schedule("0 9 * * *", async () => { await sendEmailReminder(); });
});
} catch(err) {
  console.error("DB connection error:", err);
}
})();

