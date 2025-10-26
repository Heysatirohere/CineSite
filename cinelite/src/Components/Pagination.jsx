import React from 'react';
import styles from '../Styles/Pagination.module.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
   const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

return (
    <div className={styles.paginationContainer}>
      <button 
        onClick={handlePrev}

        className={styles.button}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      
      <span className={styles.pageInfo}>
        Página {currentPage} de {totalPages}
      </span>
      
      <button
        onClick={handleNext}
        className={styles.button}
        disabled={currentPage === totalPages}
      >
        Próxima
      </button>
    </div>
  );
}

export default Pagination;