// src/components/SuggestTrickForm.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

const SuggestTrickForm = ({ open, onClose }) => {
  const [trickType, setTrickType] = useState('poolTricks');
  const [trickName, setTrickName] = useState('');
  const [trickDescription, setTrickDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable button during submission

  const formspreeEndpoint = 'https://formspree.io/f/mldnrarl'; // Your Formspree URL

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitted(false);
    setIsSubmitting(true);

    if (!trickName.trim() || !trickDescription.trim()) {
      setError('Name and Description are required.');
      setIsSubmitting(false);
      return;
    }

    const newSuggestion = {
      type: trickType,
      name: trickName.trim(),
      description: trickDescription.trim(),
      timestamp: new Date().toISOString(),
      // You can add more fields here if needed, Formspree will capture them
      // For example: _subject: "New Trick Suggestion!" (to customize email subject from Formspree)
    };

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // Formspree recommends this
        },
        body: JSON.stringify(newSuggestion),
      });

      if (response.ok) {
        setSubmitted(true);
        setTrickName('');
        setTrickDescription('');
        // setTrickType('poolTricks'); // Optionally reset type
      } else {
        const data = await response.json();
        if (data.errors && data.errors.length > 0) {
          setError(data.errors.map(err => err.message || 'An error occurred').join(", "));
        } else if (data.error) { // Sometimes Formspree returns a single error message
            setError(data.error);
        }
        else {
          setError('Oops! There was a problem submitting your form. Please try again.');
        }
        console.error('Formspree submission error data:', data);
      }
    } catch (e) {
      setError('Network error. Please check your connection and try again.');
      console.error('Network or other error during submission:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAndReset = () => {
    setSubmitted(false);
    setError('');
    setIsSubmitting(false); // Ensure this is reset
    setTrickName('');
    setTrickDescription('');
    setTrickType('poolTricks');
    onClose(); // Call the onClose prop passed from parent
  };

  return (
    <Dialog open={open} onClose={handleCloseAndReset} PaperProps={{component: 'form', onSubmit: handleSubmit}}>
      <DialogTitle>Suggest a New Trick</DialogTitle>
      <DialogContent>
        {/* Display messages above the form fields if not submitted, or only if an error after trying to submit */}
        {!submitted && error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {submitted && <Alert severity="success" sx={{ mb: 2 }}>Suggestion submitted. Thank you!</Alert>}

        {!submitted && ( /* Only show description text if form hasn't been successfully submitted yet */
          <DialogContentText sx={{ mb: 2 }}>
            Have a cool trick in mind? Share it with us!
          </DialogContentText>
        )}

        {/* Hide form fields after successful submission to prevent resubmission or show them disabled */}
        {/* For simplicity, we'll just rely on submitted message and user closing */}
        <FormControl component="fieldset" sx={{ mb: 2, width: '100%' }} disabled={isSubmitting || submitted}>
          <FormLabel component="legend">Trick Type*</FormLabel>
          <RadioGroup
            row
            aria-label="trick-type"
            name="trick-type"
            value={trickType}
            onChange={(e) => setTrickType(e.target.value)}
          >
            <FormControlLabel value="poolTricks" control={<Radio />} label="Pool 🏊" />
            <FormControlLabel value="trampolineTricks" control={<Radio />} label="Trampoline 🤸" />
          </RadioGroup>
        </FormControl>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Trick Name*"
          type="text"
          fullWidth
          variant="outlined"
          value={trickName}
          onChange={(e) => setTrickName(e.target.value)}
          sx={{ mb: 2 }}
          required
          disabled={isSubmitting || submitted}
        />
        <TextField
          margin="dense"
          id="description"
          label="Trick Description*"
          type="text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          value={trickDescription}
          onChange={(e) => setTrickDescription(e.target.value)}
          required
          disabled={isSubmitting || submitted}
        />
      </DialogContent>
      <DialogActions sx={{ p: '0 24px 20px 24px' }}>
        <Button onClick={handleCloseAndReset} color="inherit" disabled={isSubmitting}>Cancel</Button>
        <Button type="submit" variant="contained" disabled={isSubmitting || submitted}>
          {isSubmitting ? 'Submitting...' : (submitted ? 'Submitted!' : 'Submit Suggestion')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuggestTrickForm;