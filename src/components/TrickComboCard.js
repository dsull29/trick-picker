import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const TrickComboCard = ({ trick }) => {
  return (
    <Card sx={{ maxWidth: 345, mt: 3, minWidth: 300 }}>
        <CardContent>
          <Typography variant="h5">{trick.name}</Typography>
        </CardContent>
    </Card>
  );
};

export default TrickComboCard;
