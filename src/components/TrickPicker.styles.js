import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export const StyledTitle = styled(Typography)(({ theme, currentThemeMode }) => ({
  fontWeight: 'bold',
  fontFamily: "'Fredoka One', cursive",
  fontSize: 'clamp(2.5rem, 6vw, 3.75rem)',
  color: currentThemeMode === 'dark' ? theme.palette.primary.light : theme.palette.primary.dark,
  textShadow: currentThemeMode === 'dark'
    ? '2px 2px 5px rgba(0,0,0,0.7)'
    : '2px 2px 5px rgba(0,0,0,0.25)',
  padding: '10px 0',
  marginBlockEnd: '24px', // Replaces gutterBottom
  lineHeight: 1.2,
  textAlign: 'center',
}));

export const StyledActionButton = styled(Button)(({ theme, color = 'primary' }) => ({
  minWidth: '220px', // Increased slightly
  padding: '12px 28px', // Increased slightly
  fontSize: '1.1rem',
  borderRadius: '12px',
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: `0 3px 5px 2px ${color === 'primary' ? 'rgba(33, 150, 243, .3)' : 'rgba(220, 0, 78, .3)'}`,
  transition: 'transform 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: `0 5px 8px 3px ${color === 'primary' ? 'rgba(33, 150, 243, .4)' : 'rgba(220, 0, 78, .4)'}`,
  },
  // Ensure icon color matches button text color if theme changes it
  '& .MuiButton-startIcon svg': {
    color: theme.palette.getContrastText(theme.palette[color]?.main || '#000'), // Handles potential undefined main
  }
}));

export const ButtonContainer = styled(Box)({
  marginBottom: theme => theme.spacing(2), // Use theme spacing
  marginTop: theme => theme.spacing(1), // Adjusted from previous mt: 3
});