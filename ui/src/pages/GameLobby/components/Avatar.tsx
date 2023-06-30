import { Avatar } from "@mui/material";

import { useEffect, useState } from "react";
import { avatarList } from "./avatars";

const getRandomAvatar = () => {
  const randomIndex = Math.floor(Math.random() * avatarList.length);
  return avatarList[randomIndex];
};

const AvatarIcon = () => {
  const [RandomAvatarComponent, setRandomAvatarComponent] = useState("");

  useEffect(() => {
    const AvatarComponent = getRandomAvatar();
    setRandomAvatarComponent(AvatarComponent);
  }, []);

  if (!RandomAvatarComponent) {
    return avatarList[2];
  }

  return (
    <Avatar
      src={RandomAvatarComponent}
      sx={{
        width: "48px",
        height: "48px",
        borderRadius: "50%",
        marginRight: 2,
      }}
    ></Avatar>
  );
};

export default AvatarIcon;
