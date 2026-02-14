const nodemailer = require("nodemailer");
const { getDB } = require("../db");

const sendEmailReminder = async () => {
  try {
    const db = getDB();

    const now = new Date();

    const reminders = await db.collection("reminders").find({
      remindAt: { $lte: now },
      sent: { $ne: true }
    }).toArray();

    if (!reminders.length) {
      console.log("No reminders to send today.");
      return;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    for (const reminder of reminders) {
      await transporter.sendMail({
        from:`"Remind App" <${process.env.EMAIL_USER}>`,
        to: reminder.email,
        subject: `🛎️ Action Required: ${reminder.message}`,
        html: `
        <div style="background-color: #f8fafc; padding: 50px 20px; font-family: 'Plus Jakarta Sans', Helvetica, Arial, sans-serif;">
          <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
            
            <div style="background: #6366f1; padding: 30px; text-align: center;">
               <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">RemindMe</h1>
            </div>
    
            <div style="padding: 40px;">
              <h2 style="color: #1e293b; font-size: 20px; margin-top: 0;">It's time for your task!</h2>
              
              <div style="background: #f1f5f9; border-left: 4px solid #6366f1; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <p style="color: #475569; font-size: 14px; text-transform: uppercase; font-weight: 700; margin: 0 0 10px 0;">Task Description</p>
                <p style="color: #1e293b; font-size: 18px; font-weight: 600; margin: 0;">${reminder.message}</p>
              </div>
    
              <p style="color: #64748b; font-size: 15px; line-height: 1.6;">
                Scheduled for: <strong style="color: #1e293b;">${reminder.date} at ${reminder.time}</strong>
              </p>
    
              <div style="text-align: center; margin-top: 35px;">
                <a href="/Frontend/pages/dashboard.html${process.env.CLIENT_URL}" style="background: #6366f1; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 10px; font-weight: 700; display: inline-block;">View Dashboard</a>
              </div>
            </div>
    
            <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0;">&copy; 2026 RemindMe Application. All rights reserved.</p>
            </div>
          </div>
        </div>
      `
      });


      await db.collection("reminders").updateOne(
        { _id: reminder._id },
        { $set: { sent: true } }
      );

      // reminder.sent = true;
      // await reminder.save();

      console.log("Reminder email sent to:", reminder.email);
    }

  } catch (error) {
    console.error("Error sending reminder emails:", error.message);
  }
};

module.exports = sendEmailReminder;