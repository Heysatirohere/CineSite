import React from 'react';

// Estilos inline básicos
const errorStyle = {
  color: 'red',
  backgroundColor: '#ffeeee',
  border: '1px solid red',
  padding: '1rem',
  borderRadius: '5px',
  textAlign: 'center',
  margin: '1rem'
};

function ErrorMessage({ message }) {
  return (
    <div style={errorStyle}>
      <strong>Erro:</strong> {message || 'Algo deu errado.'}
    </div>
  );
}


export default ErrorMessage;