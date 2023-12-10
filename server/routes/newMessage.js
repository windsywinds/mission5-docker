const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const dotenv = require('dotenv')

//This route handles new entries added to the database by the frontend client

const MONGOURI = process.env.MONGOURI
// Variables for connection to MongoDB
const dbName = "HelloWorld";
const client = new MongoClient(MONGOURI);

router.use(bodyParser.json());
router.post("/", async (req, res) => {
    try {
        const newEntry = req.body
      await client.connect();
      const dbName = client.db("HelloWorld");
      const collection = dbName.collection("messages");
      const result = await collection.insertOne(newEntry);
      console.info(`Added new entry with ID: ${result.insertedId}`);
      const data = await collection.find().toArray();
      res.status(200).json(data);
    } catch (error) {
      // Handle errors
      console.error("Error adding new message:", error);
      res.status(500).json({ error: "Internal Server Error While Adding New Message" });
    } finally {
      await client.close();
    }
});

module.exports = router;
