const express = require("express");
const router = express.Router();

//This route exists to confirm the backend server is operational and accessible for testing by directing the browser to it

router.get("/", (req, res) => {
  const landPage = `
    <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Server</title>
      <style>
      </style>
    </head>
    <body>
  
      <h1>Up and Running!</h1>
    </body>
  </html>
    `;

  res.send(landPage);
});

module.exports = router;
