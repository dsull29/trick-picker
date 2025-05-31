// src/components/TrickPicker.js
import React, { useState, useCallback, useEffect } from 'react';
import tricksData from '../tricks.json';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import SettingsPopover from './SettingsPopover';
import ActionButtons from './ActionButtons';
// import TrickCard from './TrickCard'; // Remove old import
// import TrickComboCard from './TrickComboCard'; // Remove old import
import UnifiedTrickCard from './UnifiedTrickCard'; // Import the new unified card
import { StyledTitle } from './TrickPicker.styles';

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
    <Container sx={{ position: 'relative', pt: 8 }}>
      <SettingsPopover
        currentThemeMode={currentThemeMode}
        toggleThemeMode={toggleThemeMode}
        currentCategory={category}
        handleToggleTrickCategory={handleToggleTrickCategory}
        setCategory={setCategory}
      />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <StyledTitle variant="h2" component="h1" currentThemeMode={currentThemeMode}>
          🤸 <Box component="span">Trick Picker</Box> 🌊
        </StyledTitle>

        <ActionButtons
          onPickRandomTrick={pickRandomTrick}
          onPickCombo={pickCombo}
        />

        <Box sx={{ mt: 2, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Use UnifiedTrickCard for single trick */}
          {trick && <UnifiedTrickCard trick={trick} isComboItem={false} />}

          {/* Use UnifiedTrickCard for combo tricks */}
          {combo.length > 0 && combo.map((comboTrick, i) => (
            <UnifiedTrickCard key={i} trick={comboTrick} isComboItem={true} />
          ))}
        </Box>
      </Grid>
    </Container>
  );
};

export default TrickPicker;