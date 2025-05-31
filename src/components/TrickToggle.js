// src/components/TrickToggle.js
import React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

const TrickToggle = ({ toggleTrickCategory, currentCategory, setCurrentCategory }) => {
  const isTrampoline = currentCategory === 'trampolineTricks';

  const poolEmoji = '🏊';
  const trampolineEmoji = '🤸';

  const displayCurrentCategory = isTrampoline ? `Trampoline ${trampolineEmoji}` : `Pool ${poolEmoji}`;
  const switchToCategoryName = isTrampoline ? `Pool ${poolEmoji}` : `Trampoline ${trampolineEmoji}`;

  const handleToggle = () => {
    toggleTrickCategory();
  };

  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={isTrampoline}
            onChange={handleToggle}
            inputProps={{ 'aria-label': 'toggle trick category' }}
          />
        }
        label={
          // Removed flexGrow: 1 from Typography
          <Typography>
            Switch to {switchToCategoryName}
          </Typography>
        }
        labelPlacement="start"
        sx={{
          width: '100%',
          justifyContent: 'space-between',
          ml: 0,
          mr: 0,
          mb: 0.5,
        }}
      />
      <Typography variant="body2" sx={{ textAlign: 'right', color: 'text.secondary' }}>
        Current: {displayCurrentCategory}
      </Typography>
    </Box>
  );
};

export default TrickToggle;