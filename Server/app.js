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

app.get("/api/events/search", (req, res) => {
  const { DUMMY_EVENTS } = eventsData;
  const query = req.query.q ? req.query.q.toLowerCase() : "";
  const filteredEvents = DUMMY_EVENTS.filter((event) =>
    event.title.toLowerCase().includes(query)
  );
  if (filteredEvents.length === 0) {
    return res.status(404).json({
      success: false,
    });
  }
  res.status(200).json({
    success: true,
    data: filteredEvents,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
