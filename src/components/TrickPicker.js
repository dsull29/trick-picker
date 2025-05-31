// TrickPicker.js
import React, { useState, useCallback } from 'react'; // Added useCallback
import tricksData from '../tricks.json';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TrickToggle from './TrickToggle';
import TrickCard from './TrickCard';
import TrickComboCard from './TrickComboCard';

const TrickPicker = () => {
  const [trick, setTrick] = useState(null);
  const [combo, setCombo] = useState([]);
  // The initial state here will be the default if localStorage is empty,
  // or before TrickToggle mounts and potentially changes it.
  const [category, setCategory] = useState('poolTricks');

  const tricks = tricksData[category];

  const getRandomTrick = useCallback(() => { // useCallback for stability if passed as prop
    const availableTricks = tricksData[category]; // Ensure we use the current category's tricks
    if (!availableTricks || availableTricks.length === 0) return null; // Handle empty trick list

    const randomTrick = { ...availableTricks[Math.floor(Math.random() * availableTricks.length)] }; // Clone trick object
    if (randomTrick.type === 'R') {
      randomTrick.reps = Math.floor(Math.random() * 11) + 2; // Corrected from 10 to 11 for 2-12 range
    } else if (randomTrick.type === 'T') {
      randomTrick.seconds = Math.floor(Math.random() * 11) * 5 + 10;
    }
    return randomTrick;
  }, [category]); // Dependency: category, as tricksData[category] changes

  const pickRandomTrick = useCallback(() => {
    const randomTrick = getRandomTrick();
    setCombo([]);
    setTrick(randomTrick);
  }, [getRandomTrick]); // Dependency: getRandomTrick

  const pickCombo = useCallback(() => {
    const comboTricks = Array.from({ length: 3 }, () => getRandomTrick()).filter(t => t !== null); // Filter out nulls if trick list was empty
    setTrick(null);
    setCombo(comboTricks);
  }, [getRandomTrick]); // Dependency: getRandomTrick

  // This function is passed to TrickToggle to change the category.
  // TrickToggle will also update localStorage.
  const toggleTrickCategory = useCallback(() => {
    setCategory(prevCategory => {
      const newCategory = prevCategory === 'poolTricks' ? 'trampolineTricks' : 'poolTricks';
      // Reset trick and combo when category changes
      setTrick(null);
      setCombo([]);
      return newCategory;
    });
  }, [setCategory]); // Dependency: setCategory (stable from useState)

  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={{ m: 4 }}>
          <Typography variant="h2" gutterBottom>Trick Picker</Typography>
          <TrickToggle
            currentCategory={category}
            toggleTrickCategory={toggleTrickCategory}
            setCurrentCategory={setCategory} // Pass setCategory here
          />
          <Box sx={{ mb: 2 }}>
            <Button variant="contained" color="primary" onClick={pickRandomTrick}>Pick a Trick</Button>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Button variant="contained" color="secondary" onClick={pickCombo}>Pick a Combo</Button>
          </Box>
          {trick && <TrickCard trick={trick} />}
          {combo.length > 0 && combo.map((comboTrick, i) => <TrickComboCard key={i} trick={comboTrick} />)}
        </Box>
      </Grid>
    </Container>
  );
};

export default TrickPicker;