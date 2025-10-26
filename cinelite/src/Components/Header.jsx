import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import styles from '../Styles/Header.module.css'; 

function Header({ onSearch }) {
  return (
    <header className={styles.header}>
   
      <nav className={styles.navContainer}>
        
        <Link to="/" className={styles.titleLink}>
          <h1 className={styles.title}>CineLite</h1>
        </Link>

        <div className={styles.searchWrapper}>
          <SearchBar onSearch={onSearch} />
        </div>

      </nav>
    </header>
  );
}

export default Header;