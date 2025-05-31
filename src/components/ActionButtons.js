// src/components/ActionButtons.js
import React from 'react';
import Box from '@mui/material/Box';
import CasinoIcon from '@mui/icons-material/Casino';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import { StyledActionButton } from './TrickPicker.styles';

const ActionButtons = ({ onPickRandomTrick, onPickCombo }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'center',
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: 2,
        mt: 3,
        mb: 3,
        width: { xs: '90%', sm: 'auto' },
        maxWidth: { sm: '600px' },
        mx: { xs: 'auto', sm: 0 },
      }}
    >
      <StyledActionButton
        variant="contained"
        color="primary"
        onClick={onPickRandomTrick}
        startIcon={<CasinoIcon />}
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        Single
      </StyledActionButton>

      <StyledActionButton
        variant="contained"
        color="secondary"
        onClick={onPickCombo}
        startIcon={<ViewComfyIcon />}
        sx={{ width: { xs: '100%', sm: 'auto' } }}
      >
        Combo
      </StyledActionButton>
    </Box>
  );
};

export default ActionButtons;