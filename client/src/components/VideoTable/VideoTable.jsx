import styles from "./VideoTable.module.css";

function VideoTable({ videos }) {
  const calculateConversionRate = (conversions, views) => {
    if (views === 0) {
      return "0.00%";
    }

    return `${((conversions / views) * 100).toFixed(2)}%`;
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.analyticsTable}>
        <thead>
          <tr>
            <th>Video</th>
            <th>Product</th>
            <th>Views</th>
            <th>Clicks</th>
            <th>Conversions</th>
            <th>Conversion Rate</th>
          </tr>
        </thead>

        <tbody>
          {videos.map((video) => (
            <tr key={video.id}>
              <td>{video.title}</td>
              <td>{video.productName}</td>
              <td>{video.views}</td>
              <td>{video.clicks}</td>
              <td>{video.conversions}</td>
              <td>
                {calculateConversionRate(
                  video.conversions,
                  video.views
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VideoTable;