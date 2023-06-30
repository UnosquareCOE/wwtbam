import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Option } from "../FastestFinger";

type QuestionProps = {
  question: string;
  options: Option[];
  onSelectionHandler: (selection: number[]) => void;
  disabled: boolean;
};

const Question: React.FC<QuestionProps> = ({
  question,
  options,
  onSelectionHandler,
  disabled,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  useEffect(() => {
    if (selectedOptions.length === 4) {
      onSelectionHandler(selectedOptions);
    }
  }, [selectedOptions, onSelectionHandler]);

  const handleOptionSelect = (optionId: number) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.length === 4 && !prevOptions.includes(optionId)) {
        return prevOptions;
      }
      if (prevOptions.includes(optionId)) {
        return prevOptions.filter((prevOption) => prevOption !== optionId);
      }
      return [...prevOptions, optionId];
    });
  };
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ marginBottom: "16px" }}>
        {question}
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {options.map((option) => (
          <Grid item xs={6} key={option.id}>
            <Button
              variant="outlined"
              onClick={() => handleOptionSelect(option.id)}
              disabled={!disabled}
              sx={{
                backgroundColor: selectedOptions.includes(option.id)
                  ? "white"
                  : "transparent",
                color: selectedOptions.includes(option.id)
                  ? "black"
                  : "inherit",
                width: "100%",
                height: "55px",
              }}
            >
              {option.text}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Question;
