const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const dotenv = require('dotenv')


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
    } finally {
      await client.close();
    }
});

module.exports = router;
