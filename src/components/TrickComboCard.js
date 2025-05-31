// src/components/TrickComboCard.js
import React, { useState } from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoopIcon from '@mui/icons-material/Loop';
import TimerIcon from '@mui/icons-material/Timer';
import Divider from '@mui/material/Divider';

const TrickComboCard = ({ trick }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        width: 320, // <-- Set a fixed width here
        // minWidth: 280, // You can remove or keep minWidth; width will now dictate.
        mt: 2,
        mb: 1,
        borderRadius: '10px',
        boxShadow: '0 4px 12px -2px rgba(0,0,0,0.08), 0 0 2px -1px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.2s ease-in-out',
        // Hover effects on the clickable header are generally better for expandable cards
      }}
    >
      <Box
        onClick={handleExpandClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '12px 16px',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: (theme) => theme.palette.action.hover,
          }
        }}
      >
        <IconButton size="small" sx={{ mr: 0.5, p: 0.5 }}>
          {expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'medium',
            color: 'text.primary',
            flexGrow: 1,
            lineHeight: 1.4,
            // For text that might overflow:
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {trick.name}
        </Typography>
      </Box>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ pt: 0, pb: '16px !important' }}>
          <Divider sx={{ mb: 1.5 }} />
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1.5 }}>
            {trick.description || "No description available."}
          </Typography>

          {(trick.type === "R" || trick.type === "T") && trick.description && (
             <Divider sx={{ my: 1 }} light />
          )}

          {trick.type === "R" && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, fontSize: '0.9rem' }}>
              <LoopIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '1.1rem' }} />
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                Reps: <Box component="span" sx={{ fontWeight: 'bold' }}>{trick.reps}</Box>
              </Typography>
            </Box>
          )}

          {trick.type === "T" && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, fontSize: '0.9rem' }}>
              <TimerIcon sx={{ mr: 1, color: 'text.secondary', fontSize: '1.1rem' }} />
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                Sec: <Box component="span" sx={{ fontWeight: 'bold' }}>{trick.seconds}</Box>
              </Typography>
            </Box>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default TrickComboCard;