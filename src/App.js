// App.js
import React, { useState, useMemo, useEffect } from 'react';
import TrickPicker from './components/TrickPicker';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Helps with baseline styling and dark mode background

const App = () => {
  // State for theme mode: 'light' or 'dark'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light'; // Default to light if nothing is saved
  });

  // Save theme mode to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Function to toggle theme mode
  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Create MUI theme based on current mode
  // useMemo ensures the theme object is only recreated when mode changes
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // This automatically sets up light or dark palette
          ...(mode === 'light'
            ? {
                // Palette values for light mode
                primary: { main: '#1976d2' }, // Default MUI blue
                secondary: { main: '#dc004e' }, // Default MUI pink
                background: { default: '#f4f6f8', paper: '#ffffff' }, // Lighter background
              }
            : {
                // Palette values for dark mode
                primary: { main: '#90caf9' }, // Lighter blue for dark mode
                secondary: { main: '#f48fb1' }, // Lighter pink for dark mode
                background: { default: '#121212', paper: '#1e1e1e' }, // Dark background
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize styles and apply background color from theme */}
      <div className="App">
        <TrickPicker toggleThemeMode={toggleThemeMode} currentThemeMode={mode} />
      </div>
    </ThemeProvider>
  );
};

export default App;