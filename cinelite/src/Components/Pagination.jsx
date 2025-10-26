import React from 'react';
const paginationStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1rem',
  gap: '1rem'
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: '#f4f4f4'
};

const disabledStyle = {
  ...buttonStyle,
  cursor: 'not-allowed',
  backgroundColor: '#eee',
  color: '#aaa'
};

const pageInfoStyle = {
  fontSize: '1rem',
  fontWeight: 'bold'
};
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
    <div style={paginationStyle}>
      <button 
        onClick={handlePrev}
        disabled={currentPage === 1}
        style={currentPage === 1 ? disabledStyle : buttonStyle}
      >
        Anterior
      </button>
      
      <span style={pageInfoStyle}>
        Página {currentPage} de {totalPages}
      </span>
      
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        style={currentPage === totalPages ? disabledStyle : buttonStyle}
      >
        Próxima
      </button>
    </div>
  );
}

export default Pagination;