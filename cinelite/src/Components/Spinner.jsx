import React from 'react';
import styles from '../Styles/Spinner.module.css';

function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
      <span>Carregando...</span>
    </div>
  );
}

export default Spinner;
