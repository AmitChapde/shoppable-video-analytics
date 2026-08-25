const express = require("express");
const analyticsController = require("../controllers/analyticsController");

const router = express.Router();

router.get("/videos", analyticsController.getVideoAnalytics);

module.exports = router;