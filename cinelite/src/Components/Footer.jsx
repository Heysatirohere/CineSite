import React from 'react';
import styles from '../Styles/Footer.module.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p>
          Dados fornecidos por 
          <a 
            href="https://www.themoviedb.org/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.footerLink}
          >
            The Movie Database (TMDB)
          </a>
        </p>
        <p>
          Desenvolvido por 
          <a 
            href="https://github.com/Heysatirohere" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.footerLink}
          >
            Heysatirohere
          </a>
        </p>
        <p className={styles.copyright}>
          &copy; {currentYear} CineLite. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default Footer;