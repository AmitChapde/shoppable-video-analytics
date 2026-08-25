import { useEffect, useState } from "react";
import { createEvent, getVideoAnalytics } from "./services/analyticsApi";
import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import VideoTable from "./components/VideoTable/VideoTable";
import styles from "./App.module.css";

function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      setError("");

      const data = await getVideoAnalytics();

      setAnalyticsData(data.videos);
      setPagination(data.pagination);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const handleSimulateTraffic = async () => {
    if (analyticsData.length === 0) {
      return;
    }

    const eventTypes = ["view", "click", "add_to_cart"];

    const randomVideo =
      analyticsData[Math.floor(Math.random() * analyticsData.length)];

    const randomEventType =
      eventTypes[Math.floor(Math.random() * eventTypes.length)];

    try {
      setIsSimulating(true);
      setError("");

      await createEvent(randomVideo.id, randomEventType);

      await fetchAnalytics();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSimulating(false);
    }
  };

  if (isLoading) {
    return (
      <main className={styles.appContainer}>
        <p>Loading analytics...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.appContainer}>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className={styles.appContainer}>
      <DashboardHeader
        onSimulateTraffic={handleSimulateTraffic}
        isSimulating={isSimulating}
      />

      <section>
        <VideoTable videos={analyticsData} />
      </section>

      {pagination && (
        <p className={styles.paginationInfo}>
          Showing page {pagination.page} of {pagination.totalPages}
        </p>
      )}
    </main>
  );
}

export default App;
