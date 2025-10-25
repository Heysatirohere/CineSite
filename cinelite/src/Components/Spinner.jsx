import React from 'react';


const spinnerContainerStyle = {
  padding: '2rem',
  textAlign: 'center',
  fontSize: '1.2rem',
  color: '#555'
};

function Spinner() {
  return (
    <div style={spinnerContainerStyle}>
      <p>Carregando...</p>
      {}
    </div>
  );
}


export default Spinner;