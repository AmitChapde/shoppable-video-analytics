const db = require("./connection");

const createTables = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS Products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      price REAL NOT NULL CHECK (price >= 0),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      video_url TEXT NOT NULL,
      title TEXT NOT NULL,
      FOREIGN KEY (product_id) REFERENCES Products(id)
    );

    CREATE TABLE IF NOT EXISTS EngagementEvents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      video_id INTEGER NOT NULL,
      event_type TEXT NOT NULL CHECK (
        event_type IN ('view', 'click', 'add_to_cart')
      ),
      timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (video_id) REFERENCES Videos(id)
    );

    CREATE INDEX IF NOT EXISTS idx_videos_product_id
    ON Videos(product_id);

    CREATE INDEX IF NOT EXISTS idx_events_video_id
    ON EngagementEvents(video_id);

    CREATE INDEX IF NOT EXISTS idx_events_event_type
    ON EngagementEvents(event_type);
  `);
};

createTables();

module.exports = db;
