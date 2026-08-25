const db = require("../database/connection");

const validEventTypes = ["view", "click", "add_to_cart"];

const createEvent = (videoId, eventType) => {
  const video = db
    .prepare("SELECT id FROM Videos WHERE id = ?")
    .get(videoId);

  if (!video) {
    throw new Error("Video not found");
  }

  const result = db
    .prepare(`
      INSERT INTO EngagementEvents (video_id, event_type)
      VALUES (?, ?)
    `)
    .run(videoId, eventType);

  return {
    id: result.lastInsertRowid,
    videoId,
    eventType,
  };
};

module.exports = {
  createEvent,
  validEventTypes,
};