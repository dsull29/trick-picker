// src/components/SettingsPopover.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import TrickToggle from './TrickToggle';

const SettingsPopover = ({
  currentThemeMode,
  toggleThemeMode,
  currentCategory,
  handleToggleTrickCategory,
  setCategory,
}) => {
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);

  const handleOpenSettings = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setSettingsAnchorEl(null);
  };

  const openSettings = Boolean(settingsAnchorEl);
  const settingsId = openSettings ? 'settings-popover' : undefined;

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', p: 1, position: 'absolute', top: 0, right: 0 }}>
        <IconButton aria-label="settings" onClick={handleOpenSettings} color="inherit">
          <SettingsIcon />
        </IconButton>
      </Box>

      <Popover
        id={settingsId}
        open={openSettings}
        anchorEl={settingsAnchorEl}
        onClose={handleCloseSettings}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { borderRadius: '12px', mt: 1 }
        }}
      >
        <Box sx={{ p: 2.5, minWidth: '280px' }}>
          <Stack spacing={2}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', textAlign: 'center' }}>
              Settings
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={currentThemeMode === 'dark'}
                  onChange={toggleThemeMode}
                  inputProps={{ 'aria-label': 'toggle theme mode' }}
                />
              }
              label={
                // Removed flexGrow: 1 from Typography, justifyContent on parent handles it
                <Typography>
                  {currentThemeMode === 'light' ? '☀️ Light' : '🌙 Dark'} Mode
                </Typography>
              }
              labelPlacement="start"
              sx={{
                width: '100%',
                justifyContent: 'space-between',
                ml: 0,
                mr: 0,
              }}
            />

            <TrickToggle
              currentCategory={currentCategory}
              toggleTrickCategory={handleToggleTrickCategory}
              setCurrentCategory={setCategory}
            />
          </Stack>
        </Box>
      </Popover>
    </>
  );
};

export default SettingsPopover;