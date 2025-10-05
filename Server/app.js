const express = require("express");
const cors = require("cors");
const eventsData = require("./Data/events.js");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
