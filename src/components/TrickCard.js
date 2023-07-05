import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const TrickCard = ({ trick }) => {
  return (
    <Card sx={{ maxWidth: 345, mt: 3, minWidth: 300 }}>
        <CardContent>
          <Typography variant="h5">{trick.name}</Typography>
          <Typography variant="body2">{trick.description}</Typography>
          {trick.type === "R" ? (
            <Typography variant="body2">Repetitions: {trick.reps}</Typography>
          ) : null}
          {trick.type === "T" ? (
            <Typography variant="body2">Seconds: {trick.seconds}</Typography>
          ) : null}
        </CardContent>
    </Card>
  );
};

export default TrickCard;
