// TrickToggle.js (Simplified)
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

const TrickToggle = ({ toggleTrickCategory, currentCategory, setCurrentCategory /* optional prop now */ }) => {
  const isTrampoline = currentCategory === 'trampolineTricks';
  const displayCategory = isTrampoline ? 'Trampoline' : 'Pool';

  const handleToggle = () => {
    toggleTrickCategory();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <FormControlLabel
        control={<Switch checked={isTrampoline} onChange={handleToggle} />}
        label={`Switch to ${displayCategory === 'Pool' ? 'Trampoline' : 'Pool'} Tricks`}
      />
      <Typography>Current Category: {displayCategory} Tricks</Typography>
    </Box>
  );
};

export default TrickToggle;