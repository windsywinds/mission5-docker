const cors = require("cors");
const express = require("express");
const dotenv = require('dotenv')
const bodyParser = require("body-parser");

//route paths
const messages = require("./routes/messages.js");
const newMessage = require("./routes/newMessage.js");
const landing = require("./routes/landing.js");



const app = express();
const PORT = process.env.PORT || 8001;

const corsOptions = {
  origin: '*',
};
app.use("*", cors(corsOptions));
app.use(bodyParser.json());

//routes
app.get("/", landing);
app.use("/messages", messages);
app.use("/new", newMessage);


app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
