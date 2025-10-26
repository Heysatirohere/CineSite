import React from "react";
import { useTheme } from "./Context/ThemeContext.jsx";
import styles from "../Styles/ThemeToggle.module.css";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className={styles.toggleButton} onClick={toggleTheme}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

export default ThemeToggle;