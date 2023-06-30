import { Box, Button, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";

type JoinSessionModalProps = {
  handleFindSession: (sessionName: string, password: string) => void;
};

export const JoinSessionModal: FC<JoinSessionModalProps> = ({
  handleFindSession,
}) => {
  const [sessionName, setSessionName] = useState("");
  const [password, setPassword] = useState("");
  const handleSessionName = (value: string) => {
    setSessionName(value);
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };

  const handleGetSession = () => {
    handleFindSession(sessionName, password);
  };
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography
        id="modal-title"
        variant="h6"
        component="h2"
        align="center"
        gutterBottom
      >
        Find Session
      </Typography>
      <TextField
        label="Session Name"
        fullWidth
        value={name}
        onChange={(e) => handleSessionName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        fullWidth
        value={name}
        onChange={(e) => handlePassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        sx={{ mt: 2, p: 1 }}
        variant="contained"
        onClick={handleGetSession}
        fullWidth
      >
        Search
      </Button>
    </Box>
  );
};
