
const program = require("commander");
const { prompt } = require("inquirer");
const { MongoClient, ObjectId } = require("mongodb");


program.version("1.0.0").description("Client Management System");

program
  .command("add")
  .alias("a")
  .description("Add a single entry")
  .action(() => {
    prompt(questions).then((answers) => addEntry(answers));
  });


  const questions = [
    {
      type: "input",
      name: "message",
      message: "Enter your message:",
    }
  ];

  const addEntry = async (message) => {
    const client = new MongoClient("mongodb://localhost:27017/");
    try {
      await client.connect();
      const database = client.db("HelloWorld");
      const collection = database.collection("messages");
      const result = await collection.insertOne(message);
      console.info(`Added new entry with ID: ${result.insertedId}`);
    } finally {
      await client.close();
    }
  };

  program.parse(process.argv);