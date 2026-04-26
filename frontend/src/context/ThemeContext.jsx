import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeColor, setThemeColor] = useState('purple'); // purple, blue, green, red

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedColor = localStorage.getItem('themeColor');
    
    if (savedTheme) setIsDarkMode(savedTheme === 'dark');
    if (savedColor) setThemeColor(savedColor);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Remove all color classes
    const colors = ['theme-purple', 'theme-blue', 'theme-green', 'theme-red'];
    document.documentElement.classList.remove(...colors);
    document.documentElement.classList.add(`theme-${themeColor}`);
    localStorage.setItem('themeColor', themeColor);
  }, [themeColor]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const changeThemeColor = (color) => setThemeColor(color);

  return (
    <ThemeContext.Provider value={{ isDarkMode, themeColor, toggleTheme, changeThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
