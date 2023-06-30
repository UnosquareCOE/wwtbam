import { Box, Button, Grid } from "@mui/material";
import React from "react";

const FinalAnswerButton: React.FC<{
  selectedOption: string | null;
  correctAnswer: string;
  onFinalAnswer: () => void;
  onIncorrectGuess: () => void;
}> = ({ selectedOption, correctAnswer, onFinalAnswer, onIncorrectGuess }) => {
  const handleFinalAnswerClick = () => {
    if (selectedOption === correctAnswer) {
      onFinalAnswer();
    } else {
      onIncorrectGuess();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container>
        <Button
          sx={{ borderRadius: 2 }}
          variant="contained"
          onClick={handleFinalAnswerClick}
          disabled={!selectedOption}
        >
          Final Answer
        </Button>
      </Grid>
    </Box>
  );
};

export default FinalAnswerButton;
