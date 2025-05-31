// components/TrickPicker.js
import React, { useState, useCallback, useEffect } from 'react';
import tricksData from '../tricks.json';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Switch from '@mui/material/Switch';
import TrickToggle from './TrickToggle';
import TrickCard from './TrickCard';
import TrickComboCard from './TrickComboCard';

const TrickPicker = ({ toggleThemeMode, currentThemeMode }) => {
  const [trick, setTrick] = useState(null);
  const [combo, setCombo] = useState([]);

  const [category, setCategory] = useState(() => {
    const savedCategory = localStorage.getItem('trickCategory');
    return savedCategory || 'poolTricks';
  });

  useEffect(() => {
    localStorage.setItem('trickCategory', category);
    setTrick(null);
    setCombo([]);
  }, [category]);

  const getRandomTrick = useCallback(() => {
    const currentTricksForCategory = tricksData[category] || [];

    if (!currentTricksForCategory || currentTricksForCategory.length === 0) return null;

    const randomTrick = { ...currentTricksForCategory[Math.floor(Math.random() * currentTricksForCategory.length)] };
    if (randomTrick.type === 'R') {
      randomTrick.reps = Math.floor(Math.random() * 11) + 2;
    } else if (randomTrick.type === 'T') {
      randomTrick.seconds = Math.floor(Math.random() * 11) * 5 + 10;
    }
    return randomTrick;
  }, [category]);

  const pickRandomTrick = useCallback(() => {
    const randomTrick = getRandomTrick();
    setCombo([]);
    setTrick(randomTrick);
  }, [getRandomTrick]);

  const pickCombo = useCallback(() => {
    const comboTricks = Array.from({ length: 3 }, () => getRandomTrick()).filter(t => t !== null);
    setTrick(null);
    setCombo(comboTricks);
  }, [getRandomTrick]);

  const handleToggleTrickCategory = useCallback(() => {
    setCategory(prevCategory =>
      prevCategory === 'poolTricks' ? 'trampolineTricks' : 'poolTricks'
    );
  }, []);

  return (
    <Container>
      <Grid
        container
        direction="column"
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: '100%', p: 1 }}>
          <Typography sx={{ mr: 1 }}>
            {currentThemeMode === 'light' ? 'Light Mode' : 'Dark Mode'}
          </Typography>
          <Switch
            checked={currentThemeMode === 'dark'}
            onChange={toggleThemeMode}
            inputProps={{ 'aria-label': 'toggle theme' }}
          />
        </Box>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box sx={{ m: 2, textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom>Trick Picker</Typography>
            <TrickToggle
              currentCategory={category}
              toggleTrickCategory={handleToggleTrickCategory}
              setCurrentCategory={setCategory} // Kept as TrickToggle might expect it
            />
            <Box sx={{ mb: 2, mt: 2 }}>
              <Button variant="contained" color="primary" onClick={pickRandomTrick}>Pick a Trick</Button>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Button variant="contained" color="secondary" onClick={pickCombo}>Pick a Combo</Button>
            </Box>
            {trick && <TrickCard trick={trick} />}
            {combo.length > 0 && combo.map((comboTrick, i) => <TrickComboCard key={i} trick={comboTrick} />)}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TrickPicker;