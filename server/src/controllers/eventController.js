const eventService = require("../services/eventService");

const createEvent = (req, res) => {
  const { videoId, eventType } = req.body;

  if (!Number.isInteger(videoId)) {
    return res.status(400).json({
      message: "videoId must be an integer",
    });
  }

  if (!eventService.validEventTypes.includes(eventType)) {
    return res.status(400).json({
      message: "Invalid event type",
    });
  }

  try {
    const event = eventService.createEvent(videoId, eventType);

    return res.status(201).json({
      message: "Engagement event created successfully",
      event,
    });
  } catch (error) {
    if (error.message === "Video not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Failed to create engagement event",
    });
  }
};

module.exports = {
  createEvent,
};