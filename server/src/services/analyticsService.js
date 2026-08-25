const db = require("../database/connection");

const getVideoAnalytics = (page, limit) => {
  const offset = (page - 1) * limit;

  const analytics = db
    .prepare(
      `
    SELECT
      Videos.id,
      Videos.title,
      Videos.video_url AS videoUrl,
      Products.name AS productName,
      Products.price,

      COALESCE(SUM(
        CASE
        WHEN EngagementEvents.event_type = 'view' THEN 1
        ELSE 0
        END
      ), 0) AS views,

      COALESCE(SUM(
        CASE
        WHEN EngagementEvents.event_type = 'click' THEN 1
        ELSE 0
        END
      ), 0) AS clicks,

      COALESCE(SUM(
        CASE
        WHEN EngagementEvents.event_type = 'add_to_cart' THEN 1
        ELSE 0
        END
        ), 0) AS conversions
        
    FROM Videos

    INNER JOIN Products
      ON Videos.product_id = Products.id

    LEFT JOIN EngagementEvents
      ON Videos.id = EngagementEvents.video_id

    GROUP BY
      Videos.id,
      Videos.title,
      Videos.video_url,
      Products.name,
      Products.price

    ORDER BY Videos.id

    LIMIT ?
    OFFSET ?
  `,
    )
    .all(limit, offset);

  const totalVideos = db
    .prepare(
      `
      SELECT COUNT(*) AS count
      FROM Videos
    `,
    )
    .get();

  return {
    videos: analytics,
    pagination: {
      page,
      limit,
      totalVideos: totalVideos.count,
      totalPages: Math.ceil(totalVideos.count / limit),
    },
  };
};

module.exports = {
  getVideoAnalytics,
};
