import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import ParticipantCard, { Player } from "./components/ParticipantCard";
import AppBar from "../../components/AppBar";
import { ExitToAppOutlined } from "@mui/icons-material";
import { useState, useEffect, FC, useContext } from "react";
import { generatePath, useLocation, useNavigate } from "react-router-dom";
import SessionServices from "../../services/Sessions";
import NavigationRoutes from "../../constants/routes";
import { Sessions } from "../Dashboard/Dashboard";
import AccountService from "../../services/Users";
import { useAccountStore } from "../../context/Store";

const GameLobby = () => {
  const [session, setSession] = useState<Sessions | null>(null);
  const [gameReady, setGameReady] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const user = useAccountStore((state) => state.user);
  const contestants: Player[] = [
    {
      id: user.id || 0,
      name: `${user.firstName} ${user.lastName}`,
      role: "Audience Member",
    },
  ];

  const [players, setPlayers] = useState(contestants);
  const [presenter, setPresenter] = useState<Player | null>(null);
  const [presenterPicked, setPresenterPicked] = useState(false);
  const [contestantCount, setContestantCount] = useState(0);

  const handleOpenModal = () => setOpen((open) => !open);
  const handleBackButton = () => {
    navigate(-1);
  };
  const handleStartButton = async () => {
    if (session) {
      const response = await SessionServices.createGame(1, session.id).then(
        () => {
          handleStartFastestFingerRound(session!.id, contestants);
        }
      );
    }
  };
  const handleKickPlayer = (id: number) => {
    contestants.filter((contestant) => contestant.id !== id);
  };

  const fetchData = async (sessionId: string) => {
    const response = await SessionServices.getSessionById(sessionId);

    const gotSession = response.data;
    console.log(response.data);
    setSession(gotSession);
  };

  const fetchUserData = async () => {
    const getEmail = localStorage.getItem("emailAddress") ?? "";
    const response = await AccountService.getAccountByEmail(getEmail);
    console.log(response.data);
  };

  const handleRoleChange = (player: Player, role: string) => {
    if (role === "Presenter") {
      setPresenter(player);
      setPresenterPicked(true);
    }
    const updatedPlayers = players.map((p) =>
      p.id === player.id ? { ...p, role: role } : p
    );
    setPlayers(updatedPlayers);
  };

  useEffect(() => {
    if (user === null) {
      fetchUserData();
    }
    const contestant: Player = {
      id: user.id,
      name: user.firstName + user.lastName,
      role: "Audience Member",
    };
    console.log(contestant);
    fetchData(state.newSession.id);
  }, []);

  useEffect(() => {
    const count = players.filter(
      (player) => player.role === "Contestant"
    ).length;
    setContestantCount(count);
  }, [players, handleRoleChange]);

  const handleStartFastestFingerRound = (id: string, contestant: Player[]) => {
    const path = generatePath(NavigationRoutes.fastestFinger, { id: id });
    console.log(path);
    navigate(path, { state: { contestants } });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#5889e5",
      }}
    >
      <AppBar position="absolute">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            style={{ transform: "rotate(180deg)" }}
            onClick={handleBackButton}
          >
            <ExitToAppOutlined />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            {session?.name}
          </Typography>
        </Toolbar>
      </AppBar>

      <Modal
        open={open}
        onClose={handleOpenModal}
        aria-labelledby="modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            pt: 4,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            align="center"
            color="#000000"
            gutterBottom
          >
            Give out the password
          </Typography>
          <Typography
            variant="h2"
            component="h2"
            align="center"
            color="darkblue"
            fontWeight="bold"
          >
            {session?.password}
          </Typography>
          <Typography
            variant="h6"
            component="h2"
            align="center"
            color="#000000"
            gutterBottom
          >
            Share this link
          </Typography>
          <Button variant="contained" fullWidth>
            {window.location.href}
          </Button>
        </Box>
      </Modal>

      <Box
        component="main"
        sx={{
          pt: 4,
          pb: 4,
          flexGrow: 1,
          height: "100vh",
          width: "100vw",
          overflow: "auto",
          display: "flex",
        }}
      >
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={11}>
            <TableContainer component="main" sx={{ overflow: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={2}
                      sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: 2,
                          paddingBottom: 1,
                          backgroundColor: "transparent",
                        }}
                      >
                        <Button
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "64px",
                            margin: "2px 0",
                            borderRadius: 5,
                          }}
                          onClick={handleOpenModal}
                        >
                          Invite More
                        </Button>
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            Presenter : {presenter && presenter.name}
                          </Typography>
                          <Typography variant="h6" gutterBottom>
                            Contestants : {contestantCount}
                          </Typography>
                          <Typography
                            variant="h6"
                            component="div"
                            textAlign="center"
                          >
                            How Many Are Here: {contestants.length}
                          </Typography>
                        </Box>
                        <Button
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "64px",
                            margin: "2px 0",
                            borderRadius: 5,
                          }}
                          onClick={handleStartButton}
                        >
                          Start Game
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {players.map(
                    (player, index) =>
                      index % 2 === 0 && (
                        <TableRow key={player.id}>
                          <TableCell>
                            <ParticipantCard
                              player={player}
                              onRoleChange={handleRoleChange}
                              isPresenterPicked={presenterPicked}
                            />
                          </TableCell>
                          {players[index + 1] && (
                            <TableCell>
                              <ParticipantCard
                                player={players[index + 1]}
                                onRoleChange={handleRoleChange}
                                isPresenterPicked={presenterPicked}
                              />
                            </TableCell>
                          )}
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default GameLobby;
