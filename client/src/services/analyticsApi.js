const API_URL = import.meta.env.VITE_API_URL;

export const getVideoAnalytics = async (page = 1, limit = 10) => {
  const response = await fetch(
    `${API_URL}/analytics/videos?page=${page}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch video analytics");
  }

  return response.json();
};

export const createEvent = async (videoId, eventType) => {
  const response = await fetch(`${API_URL}/events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      videoId,
      eventType,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create engagement event");
  }

  return response.json();
};
