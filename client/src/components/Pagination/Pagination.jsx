import styles from "./Pagination.module.css";

function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      onPageChange(pagination.page - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      onPageChange(pagination.page + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={styles.paginationButton}
        onClick={handlePreviousPage}
        disabled={pagination.page === 1}
      >
        Previous
      </button>

      <span className={styles.pageInfo}>
        Page {pagination.page} of {pagination.totalPages}
      </span>

      <button
        className={styles.paginationButton}
        onClick={handleNextPage}
        disabled={pagination.page === pagination.totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;