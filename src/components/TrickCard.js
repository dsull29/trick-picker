// TrickCard.js
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box"; // For layout
import Divider from "@mui/material/Divider"; // To separate content

// Import icons
import LoopIcon from '@mui/icons-material/Loop'; // For repetitions
import TimerIcon from '@mui/icons-material/Timer'; // For seconds

const TrickCard = ({ trick }) => {
  return (
    <Card
      sx={{
        maxWidth: 360, // Slightly wider for more content room
        minWidth: 320,
        mt: 3,
        borderRadius: '12px', // Softer, more modern corners
        boxShadow: '0 8px 16px -4px rgba(0,0,0,0.1), 0 0 4px -1px rgba(0,0,0,0.06)', // More prominent but soft shadow
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-6px)', // Lift effect on hover
          boxShadow: '0 12px 24px -6px rgba(0,0,0,0.15), 0 0 8px -2px rgba(0,0,0,0.1)', // Enhanced shadow on hover
        },
        // Example: border that adapts to theme mode
        // border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent sx={{ padding: '20px' }}> {/* Slightly more padding */}
        <Typography
          variant="h5"
          component="div" // Good for semantics
          sx={{
            fontWeight: 'bold',
            color: 'primary.main', // Use primary color for the title
            mb: 1, // Margin bottom for spacing
            // You could use a custom font here if you have one for titles
            // fontFamily: "'Fredoka One', cursive",
          }}
        >
          {trick.name}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary" // Softer color for description
          sx={{
            mb: 2, // Margin bottom before details or divider
            minHeight: '40px', // Ensures some space even if description is short
            fontStyle: 'italic', // Make description italic
          }}
        >
          {trick.description}
        </Typography>

        {(trick.type === "R" || trick.type === "T") && (
          <Divider sx={{ my: 1.5 }} /> // Add a divider if there are details
        )}

        {trick.type === "R" && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
            <LoopIcon sx={{ mr: 1, color: 'secondary.main', fontSize: '1.2rem' }} />
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Repetitions: <Box component="span" sx={{ fontWeight: 'bold', color: 'secondary.dark' }}>{trick.reps}</Box>
            </Typography>
          </Box>
        )}

        {trick.type === "T" && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
            <TimerIcon sx={{ mr: 1, color: 'secondary.main', fontSize: '1.2rem' }} />
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Seconds: <Box component="span" sx={{ fontWeight: 'bold', color: 'secondary.dark' }}>{trick.seconds}</Box>
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default TrickCard;