import { useEffect, useState } from "react";
import { getVideoAnalytics } from "./services/analyticsApi";
import VideoTable from "./components/VideoTable/VideoTable";
import styles from "./App.module.css";

function App() {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);

        const data = await getVideoAnalytics();

        setAnalyticsData(data.videos);
        setPagination(data.pagination);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

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
      <header className={styles.dashboardHeader}>
        <h1>Shoppable Video Analytics</h1>
        <p>Track how your shoppable videos are performing.</p>
      </header>

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