
const API_URL = import.meta.env.VITE_API_URL;

export const getVideoAnalytics = async (page = 1, limit = 10) => {
  const response = await fetch(
    `${API_URL}/analytics/videos?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch video analytics");
  }

  return response.json();
};
