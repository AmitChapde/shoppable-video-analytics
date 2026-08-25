import styles from "./DashboardHeader.module.css";

function DashboardHeader({
  onSimulateTraffic,
  isSimulating,
}) {
  return (
    <header className={styles.dashboardHeader}>
      <div className={styles.headerContent}>
        <h1>Shoppable Video Analytics</h1>

        <p>
          Track how your shoppable videos are performing.
        </p>
      </div>

      <button
        className={styles.simulateButton}
        onClick={onSimulateTraffic}
        disabled={isSimulating}
      >
        {isSimulating
          ? "Simulating..."
          : "Simulate Traffic"}
      </button>
    </header>
  );
}

export default DashboardHeader;