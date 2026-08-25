const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./database/schema");
const eventRoutes = require("./routes/eventRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

const app = express();

app.use(cors());
app.use(express.json());



const PORT = process.env.PORT || 5000;

app.get("/api/health", (req, res) => {
  res.json({
    message: "Server is running",
  });
});

app.use("/api/events", eventRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
