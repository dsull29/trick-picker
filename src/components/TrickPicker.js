import React, { useState } from 'react';
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
  const [category, setCategory] = useState('poolTricks');

  const tricks = tricksData[category];

  const pickRandomTrick = () => {
    const randomTrick = getRandomTrick();
    setCombo([]);
    setTrick(randomTrick);
  };

  const pickCombo = () => {
    const comboTricks = Array.from({ length: 3 }, () => getRandomTrick());
    setTrick(null);
    setCombo(comboTricks);
  }

  const getRandomTrick = () => {
    const randomTrick = tricks[Math.floor(Math.random() * tricks.length)];
    if (randomTrick.type === 'R') {
      // pick a random number of repitions between 2 and 12
      randomTrick.reps = Math.floor(Math.random() * 10) + 2;
    } else if (randomTrick.type === 'T') {
      // pick a random number of seconds between 10 and 60 seconds, in increments of 5
      randomTrick.seconds = Math.floor(Math.random() * 11) * 5 + 10;
    }
    return randomTrick;
  }

  const toggleTrickCategory = () => {
    setCategory(prevCategory => prevCategory === 'poolTricks' ? 'trampolineTricks' : 'poolTricks');
    setTrick(null);
    setCombo([]);
  }

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
          <TrickToggle toggleTrickCategory={toggleTrickCategory} currentCategory={category} />
          <Box sx={{ mb: 2 }}>
            <Button variant="contained" color="primary" onClick={pickRandomTrick}>Pick a Trick</Button>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Button variant="contained" color="secondary" onClick={pickCombo}>Pick a Combo</Button>
          </Box>
          {/* if trick then call TrickCard */}
          {trick ? <TrickCard trick={trick} /> : null }
          {/* if combo then map through and call TrickCard for each */}
          {combo.map((comboTrick, i) => <TrickComboCard key={i} trick={comboTrick} />)}
        </Box>
      </Grid>
    </Container>
  );
};

export default TrickPicker;