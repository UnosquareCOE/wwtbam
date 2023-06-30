import { Box, Button, TextField, Typography } from "@mui/material";
import { FC } from "react";

type NewSessionModalProps = {
  handlePasswordGeneration: (event: any) => void;
  handleNewSessionName: (name: string) => void;
  handleCreateSession: (event: any) => void;
  passwordSet: boolean;
  nameSet: boolean;
};

export const NewSessionModal: FC<NewSessionModalProps> = ({
  handlePasswordGeneration,
  handleNewSessionName,
  handleCreateSession,
  passwordSet,
  nameSet,
}) => {
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
        Create New Session
      </Typography>
      <TextField
        label="Session Name"
        fullWidth
        value={name}
        onChange={(e) => handleNewSessionName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        sx={{ p: 1 }}
        variant="contained"
        onClick={handlePasswordGeneration}
        disabled={passwordSet}
        fullWidth
      >
        Generate Password
      </Button>
      <Button
        sx={{ mt: 2, p: 1 }}
        variant="contained"
        onClick={handleCreateSession}
        disabled={nameSet || passwordSet}
        fullWidth
      >
        Create
      </Button>
    </Box>
  );
};
