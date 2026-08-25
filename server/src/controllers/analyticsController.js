const analyticsService = require("../services/analyticsService");

const getVideoAnalytics = (req, res) => {
  const page = Number.parseInt(req.query.page, 10) || 1;
  const limit = Number.parseInt(req.query.limit, 10) || 10;

  if (page < 1 || limit < 1) {
    return res.status(400).json({
      message: "Page and limit must be positive numbers",
    });
  }

  const analytics = analyticsService.getVideoAnalytics(page, limit);

  return res.status(200).json(analytics);
};

module.exports = {
  getVideoAnalytics,
};