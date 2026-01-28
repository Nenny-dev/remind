const { MongoClient } = require("mongodb");

let db;

async function connectDB() {
  try {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);
    await client.connect();

    db = client.db("remindme");
    console.log("MongoDB Atlas connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };