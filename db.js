// db.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://username:password@cluster.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB server");
    return client.db("fullstack-capstone");
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1);
  }
}

module.exports = connectDB;
