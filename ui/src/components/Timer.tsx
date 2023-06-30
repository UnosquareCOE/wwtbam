import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

type TimerProps = {
  time: number;
  isRunning: boolean;
  handleEndTimer: (timeTaken: number) => void;
};

const Timer: React.FC<TimerProps> = ({ time, isRunning, handleEndTimer }) => {
  const [progress, setProgress] = useState(0);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    let currentProgress = 0;
    let endTime: number | null = null;
    const updateProgress = () => {
      currentProgress += 1;

      if (currentProgress === time) {
        clearInterval(interval!);
        handleEndTimer(currentProgress);
      }
      setProgress(currentProgress);
    };

    if (isRunning) {
      setStartTime(Date.now());
      interval = setInterval(updateProgress, 1000);
    } else if (!isRunning) {
      endTime = Date.now();
      const timeDiff = (endTime - startTime) / 1000;
      handleEndTimer(timeDiff);
    }

    return () => {
      clearInterval(interval!);
    };
  }, [isRunning]);

  const progressValue = Math.min(progress, time);
  const progressPercentage = (progressValue / time) * 100;

  return (
    <Box
      sx={{
        position: "relative",
        width: 100,
        height: 100,
        border: "3px solid black",
        borderRadius: "50%",
      }}
    >
      <CircularProgress
        variant="determinate"
        value={progressPercentage}
        size={100}
        thickness={4}
        sx={{
          position: "absolute",
          zIndex: 1,
          color: "white",
        }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 100,
          height: 100,
        }}
      >
        <Typography variant="h3" sx={{ color: "white" }}>
          {progress}
        </Typography>
      </Box>
    </Box>
  );
};

export default Timer;
