import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import AvatarIcon from "./Avatar";

export interface Player {
  id: number;
  name: string;
  role: string;
}

type ParticipantCardProp = {
  player: Player;
  isPresenterPicked: boolean;
  onRoleChange: (player: Player, role: string) => void;
};

const ParticipantCard: React.FC<ParticipantCardProp> = ({
  player,
  isPresenterPicked,
  onRoleChange,
}) => {
  const [menuOpen, setMenuOpen] = useState<null | HTMLElement>(null);
  const open = Boolean(menuOpen);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuOpen(event.currentTarget);
  };
  const handleRoleChange = (role: string) => {
    onRoleChange(player, role);
    handleClose();
  };

  const handleKickParticipant = (id: number) => {
    handleClose();
  };

  const handleClose = () => {
    setMenuOpen(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "64px",
        padding: 2,
        margin: "2px 0",
        borderRadius: 5,
        border: "1px solid white",
      }}
    >
      <Box
        sx={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          marginRight: 2,
        }}
      >
        <AvatarIcon />
      </Box>
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontSize: "0.875rem", fontWeight: "bold" }}
        >
          {player.name}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontSize: "0.875rem" }}>
          {player.role}
        </Typography>
      </Box>
      <Button
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Edit
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={menuOpen}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {!isPresenterPicked && (
          <MenuItem onClick={() => handleRoleChange("Presenter")}>
            Make Presenter
          </MenuItem>
        )}
        <MenuItem onClick={() => handleRoleChange("Contestant")}>
          Make Contestant
        </MenuItem>
        <MenuItem onClick={() => handleRoleChange("Audience Member")}>
          Make Audience Member
        </MenuItem>
        <MenuItem onClick={() => handleKickParticipant(1)}>
          Kick Player
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ParticipantCard;
