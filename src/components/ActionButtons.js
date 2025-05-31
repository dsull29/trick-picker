// src/components/ActionButtons.js
import React from 'react';
import Box from '@mui/material/Box'; // Box will be our flex container
import CasinoIcon from '@mui/icons-material/Casino';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import { StyledActionButton } from './TrickPicker.styles'; // Import styled button

// We are not using ButtonContainer from styles for this layout,
// as we need a single flex container for side-by-side buttons.

const ActionButtons = ({ onPickRandomTrick, onPickCombo }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center', // Center the buttons if they don't fill the width
        alignItems: 'center',
        gap: 2, // Spacing between the buttons (theme.spacing(2))
        mt: 3,  // Margin top for the group
        mb: 3,  // Margin bottom for the group
      }}
    >
      <StyledActionButton
        variant="contained"
        color="primary"
        onClick={onPickRandomTrick}
        startIcon={<CasinoIcon />}
      >
        Single
      </StyledActionButton>

      <StyledActionButton
        variant="contained"
        color="secondary"
        onClick={onPickCombo}
        startIcon={<ViewComfyIcon />}
      >
        Combo
      </StyledActionButton>
    </Box>
  );
};

export default ActionButtons;