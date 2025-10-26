import React, { createContext, useState, useEffect, useContext } from 'react';
const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => {
  return useContext(ThemeContext);
};