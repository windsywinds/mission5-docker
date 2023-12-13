const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const dotenv = require('dotenv')

//This route is responsible for providing the frontend client any database entries

const MONGOURI = process.env.MONGOURI || "mongodb://localhost:27017"
// Variables for connection to MongoDB
const dbName = "HelloWorld";
const client = new MongoClient(MONGOURI);

router.get("/", async (req, res) => {
  console.log("Request for messages made!")
  try {
    await client.connect();

    // Access the database
    const db = client.db(dbName);

    // Access the collection
    const collection = db.collection("messages");

    // Find all entries in collection
    const data = await collection.find().toArray();

    // Respond with the data
    res.status(200).json(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal Server Error While Getting Messages" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

module.exports = router;
