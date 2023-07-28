import React from "react";
import { Box } from "@mui/material";

interface MoneyLevel {
  levelId: number;
  value: string;
}
type MoneyLadderProps = {
  levels: MoneyLevel[];
  currentLevel: number;
};

const MoneyLadder: React.FC<MoneyLadderProps> = ({ levels, currentLevel }) => {
  return (
    <Box>
      {levels.map((level, index) => (
        <Box
          key={index}
          textAlign="center"
          sx={{
            backgroundColor: index < currentLevel ? "white" : "#42b983",
            color: "black",
            margin: 2,
            px: 1,
            borderRadius: 3,
            border: "2px solid black",
          }}
        >
          {level.value}
        </Box>
      ))}
    </Box>
  );
};
export default MoneyLadder;
