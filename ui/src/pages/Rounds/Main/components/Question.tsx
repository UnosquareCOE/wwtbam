import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

type QuestionProps = {
  question: string;
  difficulty: string;
  category: string;
  options: (string | null)[];
  selectedOption: string | null;
  onOptionSelect: (option: string) => void;
};

const Question: React.FC<QuestionProps> = ({
  question,
  difficulty,
  category,
  options,
  selectedOption,
  onOptionSelect,
}) => {
  const handleOptionClick = (option: string) => {
    onOptionSelect(option);
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Box sx={{ pb: 2, mb: 1 }}>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Typography variant="h6">{category}</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">{difficulty.toUpperCase()}</Typography>
          </Grid>
        </Grid>
      </Box>
      <Typography variant="h4" sx={{ marginBottom: "16px" }}>
        {question}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {options!.map((option) => (
          <Grid item xs={6} key={option}>
            <Button
              variant="outlined"
              onClick={() => handleOptionClick(option!)}
              sx={{
                borderColor: selectedOption === option ? "black" : "",
                borderWidth: selectedOption === option ? 3 : 1,
              }}
              fullWidth
            >
              {option}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Question;
