import { styled } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { Person } from "@mui/icons-material";
import { Button, Modal, TextField } from "@mui/material";
import { generatePath, useNavigate } from "react-router-dom";
import NavigationRoutes from "../../constants/routes";
import { useEffect, useState } from "react";
import SessionServices from "../../services/Sessions";
import SessionsScreen from "./components/Sessions";
import { AuthContext } from "../../context";
import { useAccountStore } from "../../context/Store";
import { NewSessionModal } from "./components/NewSessionModal";
import { JoinSessionModal } from "./components/JoinSessionModal";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export interface Sessions {
  id: string;
  name: string;
  createdDate: Date;
  password: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const [sessions, setSessions] = useState<Sessions[] | null>(null);
  const [newSession, setNewSession] = useState<Sessions | null>(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [nameSet, setNameSet] = useState(false);
  const [passwordSet, setPasswordSet] = useState(false);
  const { dispatch } = AuthContext.useLogin();
  const user = useAccountStore((state) => state.user);

  const fetchData = async () => {
    console.log(localStorage.getItem("user"));
    const response = await SessionServices.getSessions();

    const gotSessions = response.data;
    setSessions(gotSessions);
  };

  const createSession = async () => {
    const response = await SessionServices.createSession(name, password);
    if (response) {
      setNewSession(response.data);
      console.log(response.data);
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    const response = await SessionServices.deleteSession(sessionId);
    fetchData();
  };

  const handleContinueSession = async (session: Sessions) => {
    const newSession = session;
    handleNavigateLobby(newSession.id, newSession);
  };

  const handleNavigateLobby = (id: string, newSession: Sessions) => {
    const path = generatePath(NavigationRoutes.Lobby, { id });
    navigate(path, { state: { newSession, id } });
  };

  const handlePasswordGeneration = () => {
    const generatedPassword = Math.random().toString(36).slice(-6);
    setPassword(generatedPassword);
    setPasswordSet(true);
  };

  const handleNewSessionName = (sessionName: string) => {
    setName(sessionName);
    setNameSet(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (newSession) {
      handleNavigateLobby(newSession.id, newSession);
    }
  }, [newSession]);

  const handleOpenModal = () => setOpen((open) => !open);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    localStorage.removeItem("emailAddress");
    dispatch({ type: "logout" });
  };

  const handleCreateSession = async () => {
    createSession();
    handleOpenModal();
  };

  const handleFindSession = async (
    sessionName: string,
    sessionPassword: string
  ) => {
    console.log("loading");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="absolute">
        <Toolbar>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Who wants to be a Rich Unicorn?
          </Typography>
          <Box>
            <Button
              sx={{ backgroundColor: "transparent" }}
              onClick={handleClick}
              id="fade-button"
              aria-controls="fade-menu"
              aria-haspopup="true"
              aria-expanded={anchorEl ? "true" : undefined}
            >
              <Person sx={{ color: "white", px: 1 }} />
              <Typography color="white">
                {user.firstName} {user.lastName}
              </Typography>
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem> Update Account</MenuItem>
              <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          width: "100vw",
          overflow: "auto",
          display: "flex",
          paddingTop: 10,
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Grid container>
                <Grid item xs={4}>
                  <Button variant="contained" onClick={handleOpenModal}>
                    New Session
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleOpenModal}
                    aria-labelledby="modal-title"
                  >
                    <NewSessionModal
                      handleCreateSession={handleCreateSession}
                      handleNewSessionName={handleNewSessionName}
                      handlePasswordGeneration={handlePasswordGeneration}
                      passwordSet={passwordSet}
                      nameSet={nameSet}
                    />
                  </Modal>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" onClick={handleOpenModal}>
                    Join Session
                  </Button>
                  <Modal
                    open={open}
                    onClose={handleOpenModal}
                    aria-labelledby="modal-title"
                  >
                    <JoinSessionModal handleFindSession={handleFindSession} />
                  </Modal>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {sessions ? (
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  <SessionsScreen
                    sessions={sessions}
                    handleDeleteSession={handleDeleteSession}
                    handleContinueSession={handleContinueSession}
                  />
                </Paper>
              ) : (
                <Paper sx={{ p: 2, textAlign: "center" }}>
                  <Typography variant="body1">
                    No sessions found. Please create a session.
                  </Typography>
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
