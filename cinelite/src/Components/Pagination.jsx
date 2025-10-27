import React, { useState, useRef, useLayoutEffect } from 'react';
import styles from '../Styles/Pagination.module.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const [jumpPage, setJumpPage] = useState('');
  const jumpInputRef = useRef(null);

  // Força line-height igual à altura para placeholder clicável
  useLayoutEffect(() => {
    if (jumpInputRef.current) {
      const input = jumpInputRef.current;
      input.style.lineHeight = `${input.offsetHeight}px`;
    }
  }, [currentPage]);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handleJump = (e) => {
    e.preventDefault();
    const targetPage = parseInt(jumpPage, 10);

    if (targetPage >= 1 && targetPage <= totalPages) {
      onPageChange(targetPage);
      setJumpPage('');
    } else {
      alert(`Por favor, insira um número entre 1 e ${totalPages}.`);
    }
  };

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.mainControls}>
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

      <form key={currentPage} onSubmit={handleJump} className={styles.jumpForm}>
        <input
          ref={jumpInputRef}
          type="number"
          min="1"
          max={totalPages}
          value={jumpPage}
          onChange={(e) => setJumpPage(e.target.value)}
          placeholder="Ir para página"
          className={styles.jumpInput}
        />
        <button type="submit" className={styles.jumpButton} disabled={!jumpPage}>
          IR
        </button>
      </form>
    </div>
  );
}

export default Pagination;
