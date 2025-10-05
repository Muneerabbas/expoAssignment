const express = require("express");
const cors = require("cors");
const eventsData = require("./Data/events.js");

const app = express();
const port = 3000;
app.use(cors());

app.get("/api/events", (req, res) => {
  const { DUMMY_EVENTS } = eventsData;
  res.status(200).json({
    success: true,
    data: DUMMY_EVENTS,
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
