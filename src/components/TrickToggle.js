// TrickToggle.js
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';

const TrickToggle = ({ toggleTrickCategory, currentCategory, setCurrentCategory }) => { // Added setCurrentCategory
  const isTrampoline = currentCategory === 'trampolineTricks';
  const displayCategory = isTrampoline ? 'Trampoline' : 'Pool';

  // Load the saved category from localStorage when the component mounts
  useEffect(() => {
    const savedCategory = localStorage.getItem('trickCategory');
    if (savedCategory && savedCategory !== currentCategory) {
      // If you have a direct setter for currentCategory from the parent, use that.
      // This example assumes the parent component manages 'currentCategory'
      // and 'toggleTrickCategory' is the only way to change it from here.
      // A more direct approach would be to pass a 'setCurrentCategory' function.
      if (setCurrentCategory) { // Check if setCurrentCategory is provided
        setCurrentCategory(savedCategory);
      } else if (savedCategory === 'trampolineTricks' && !isTrampoline) {
        toggleTrickCategory(); // Toggle if saved is trampoline and current is not
      } else if (savedCategory === 'poolTricks' && isTrampoline) {
        toggleTrickCategory(); // Toggle if saved is pool and current is trampoline
      }
    }
  }, [setCurrentCategory]); // Added setCurrentCategory to dependencies, ensure it's stable or memoized

  // Save the category to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('trickCategory', currentCategory);
  }, [currentCategory]);

  const handleToggle = () => {
    // Optimistically update localStorage before parent state might change
    const nextCategory = isTrampoline ? 'poolTricks' : 'trampolineTricks';
    localStorage.setItem('trickCategory', nextCategory);
    toggleTrickCategory(); // Call the passed-in toggle function
  };

  return (
    <Box sx={{ mb: 2 }}>
      <FormControlLabel
        control={<Switch checked={isTrampoline} onChange={handleToggle} />} // Use handleToggle
        label={`Switch to ${displayCategory === 'Pool' ? 'Trampoline' : 'Pool'} Tricks`}
      />
      <Typography>Current Category: {displayCategory} Tricks</Typography>
    </Box>
  );
};

export default TrickToggle;