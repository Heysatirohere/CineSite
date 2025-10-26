import React from 'react';
import styles from '../Styles/ErrorMessage.module.css'; 

function ErrorMessage({ message }) {
  return (
    <div className={styles.errorContainer}>
      <span className={styles.errorIcon}>!</span>
      <h2 className={styles.errorTitle}>Ocorreu um Erro</h2>
      <p className={styles.errorMessage}>
        {message || 'Algo deu errado. Por favor, tente novamente mais tarde.'}
      </p>
    </div>
  );
}

export default ErrorMessage;