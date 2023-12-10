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


//Middleware

//tell cors to allow requests from all origins
const corsOptions = {
  origin: '*',
};
app.use("*", cors(corsOptions));
app.use(bodyParser.json());

//routes
app.get("/", landing);
app.use("/messages", messages);
app.use("/new", newMessage);

//Handle any unexpected or missed errors
app.use((error, req, res, next) => {
  console.error(error.stack);
  // Check if the error is a known type
  if (error.name === 'ValidationError') {
    // Handle validation errors
    res.status(400).json({ error: 'Validation failed', details: error.errors });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
