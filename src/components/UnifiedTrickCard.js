// src/components/UnifiedTrickCard.js
import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';

// Icons
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoopIcon from '@mui/icons-material/Loop';
import TimerIcon from '@mui/icons-material/Timer';

const UnifiedTrickCard = ({ trick, isComboItem = false }) => {
  // Single tricks are expanded by default, combo items are collapsed by default
  const [expanded, setExpanded] = useState(!isComboItem);

  // If isComboItem changes, reset expanded state (e.g. if the same component instance was reused)
  // This is less likely in your current setup where cards are mapped, but good for robustness.
  useEffect(() => {
    setExpanded(!isComboItem);
  }, [isComboItem]);


  const handleExpandClick = () => {
    if (isComboItem) { // Only allow expansion/collapse for combo items
      setExpanded(!expanded);
    }
  };

  const cardWidth = 320; // Unified width

  return (
    <Card
      sx={{
        width: cardWidth,
        mt: isComboItem ? 2 : 3, // Slightly less top margin for combo items
        mb: 1,
        borderRadius: '12px', // Unified border radius
        boxShadow: isComboItem
          ? '0 4px 12px -2px rgba(0,0,0,0.08), 0 0 2px -1px rgba(0,0,0,0.04)' // Subtle for combo
          : '0 8px 16px -4px rgba(0,0,0,0.1), 0 0 4px -1px rgba(0,0,0,0.06)', // Prominent for single
        transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out',
        '&:hover': {
          boxShadow: isComboItem
            ? '0 6px 16px -3px rgba(0,0,0,0.12), 0 0 4px -1px rgba(0,0,0,0.08)'
            : '0 12px 24px -6px rgba(0,0,0,0.15), 0 0 8px -2px rgba(0,0,0,0.1)',
          transform: !isComboItem ? 'translateY(-6px)' : (isComboItem && !expanded ? 'translateX(4px)' : 'none'), // Different hover for single vs. combo
        },
      }}
    >
      <Box
        onClick={isComboItem ? handleExpandClick : undefined} // Clickable only if combo item
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: isComboItem ? 'pointer' : 'default',
          padding: isComboItem ? '12px 16px' : '20px 20px 0px 20px', // More padding for single trick title area, no bottom padding here
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: isComboItem ? (theme) => theme.palette.action.hover : 'transparent',
          },
        }}
      >
        {isComboItem && (
          <IconButton size="small" sx={{ mr: 0.5, p: 0.5 }} aria-label="expand trick details">
            {expanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
          </IconButton>
        )}
        <Typography
          variant={isComboItem ? "h6" : "h5"}
          component="div"
          sx={{
            fontWeight: isComboItem ? 'medium' : 'bold',
            color: isComboItem ? 'text.primary' : 'primary.main',
            flexGrow: 1,
            lineHeight: 1.4,
            whiteSpace: isComboItem ? 'nowrap' : 'normal', // Allow single trick titles to wrap
            overflow: isComboItem ? 'hidden' : 'visible',
            textOverflow: isComboItem ? 'ellipsis' : 'clip',
            mb: !isComboItem ? 1 : 0, // Margin bottom for single trick title
          }}
        >
          {trick.name}
        </Typography>
      </Box>

      {/* Collapsible or always visible content */}
      <Collapse in={expanded} timeout="auto" unmountOnExit={isComboItem}> {/* Unmount only for combo */}
        <CardContent sx={{
            padding: isComboItem ? '0 16px 16px 16px' : '0 20px 20px 20px', // Adjust padding
            pt: isComboItem ? 0 : 1, // Add top padding if not combo item and title had mb
          }}>
          {!isComboItem && !trick.description && !trick.type && <Box sx={{minHeight: '20px'}} />} {/* Ensure some height if no details for single */}

          {/* Divider before description, always present if content follows */}
          {(trick.description || trick.type === "R" || trick.type === "T") && (
            <Divider sx={{ mb: 1.5, mt: isComboItem ? 0 : 0 }} />
          )}

          {trick.description && (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 1.5 }}>
              {trick.description}
            </Typography>
          )}

          {/* Divider between description and details, only if both exist */}
          {trick.description && (trick.type === "R" || trick.type === "T") && (
             <Divider sx={{ my: 1.5 }} light />
          )}

          {trick.type === "R" && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, fontSize: isComboItem ? '0.9rem' : '1rem' }}>
              <LoopIcon sx={{ mr: 1, color: isComboItem ? 'text.secondary' : 'secondary.main', fontSize: isComboItem ? '1.1rem' : '1.2rem' }} />
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                Repetitions: <Box component="span" sx={{ fontWeight: 'bold', color: isComboItem ? 'text.primary' : 'secondary.dark' }}>{trick.reps}</Box>
              </Typography>
            </Box>
          )}

          {trick.type === "T" && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, fontSize: isComboItem ? '0.9rem' : '1rem' }}>
              <TimerIcon sx={{ mr: 1, color: isComboItem ? 'text.secondary' : 'secondary.main', fontSize: isComboItem ? '1.1rem' : '1.2rem' }} />
              <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                Seconds: <Box component="span" sx={{ fontWeight: 'bold', color: isComboItem ? 'text.primary' : 'secondary.dark' }}>{trick.seconds}</Box>
              </Typography>
            </Box>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default UnifiedTrickCard;