import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import Timer from "../../../components/Timer";
import { fastestFingerQuestions as ffQuestions } from "../../../Questions";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { Player } from "../../GameLobby/components/ParticipantCard";
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import NavigationRoutes from "../../../constants/routes";
import AppBar from "../../../components/AppBar";
import { useAccountStore } from "../../../context/Store";

interface Question {
  id: number;
  question: string;
  options: Option[];
  correctOrder: number[];
}

export interface Option {
  id: number;
  text: string;
}

const FastestFinger = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [orderedCorrectly, setOrderCorrectly] = useState<boolean | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const { state } = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = useAccountStore((state) => state.user);
  const [winner, setWinner] = useState("");

  useEffect(() => {
    const getRandomQuestion = () => {
      const randomIndex = Math.floor(Math.random() * ffQuestions.length);
      const question = ffQuestions[randomIndex];
      setQuestion(question);
    };
    getRandomQuestion();
  }, []);

  const onSelectionHandler = (selection: number[]) => {
    setSelectedOptions(selection);
    setIsTimerRunning(false);
    if (checkAnswer()) {
      setOrderCorrectly(true);
    } else {
      setOrderCorrectly(false);
    }

    setOpen(true);
  };

  const checkAnswer = () => {
    if (question && selectedOptions.length === question.correctOrder.length) {
      const isCorrect = selectedOptions.every(
        (selectedOption, index) =>
          selectedOption === question.correctOrder[index]
      );
      setWinner(`${user.firstName} ${user.lastName}`);

      return isCorrect;
    }

    return false;
  };

  const handleGameOver = () => {
    console.log("You lost, bruv");
  };

  const handleEndTimer = (timeTaken: number) => {
    setEndTime(timeTaken);
    setIsTimerRunning(false);
    handleGameOver();
    setOpen(true);
  };

  const navigateMainGame = () => {
    const path = generatePath(NavigationRoutes.mainGame, { id: id });
    console.log(path);
    navigate(path);
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
            Fastest Fingers First
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ paddingX: 4 }}>
        <Modal open={open} aria-labelledby="modal-title">
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
              The Winner is
            </Typography>

            <Typography
              variant="h6"
              component="h2"
              align="center"
              color="#000000"
              gutterBottom
            >
              {winner}
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              align="center"
              color="#000000"
              gutterBottom
            >
              Time: {endTime}s
            </Typography>
            <Button variant="contained" onClick={navigateMainGame} fullWidth>
              Ready
            </Button>
          </Box>
        </Modal>
        <Grid container spacing={4} direction="row">
          <Grid item xs={3}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginY={10}
            >
              <Box marginBottom={4}>
                <Timer
                  key={currentQuestionIndex}
                  time={20}
                  isRunning={isTimerRunning}
                  handleEndTimer={handleEndTimer}
                />
              </Box>
              {endTime !== null && (
                <Typography variant="h6">
                  Time taken: {endTime} seconds
                </Typography>
              )}
            </Box>
            <TableContainer component="main" sx={{ overflow: "auto" }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}
                    >
                      <Box>
                        <Typography>Contestants</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state &&
                    state.contestants &&
                    state.contestants.map((contestant: Player) => (
                      <TableRow
                        key={contestant.id}
                        sx={{
                          backgroundColor:
                            contestant.id === user.id
                              ? orderedCorrectly
                                ? "green"
                                : ""
                              : "transparent",
                        }}
                      >
                        <TableCell>
                          <Typography>{contestant.name}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={9}>
            <Box display="flex" justifyContent="center" marginY={25}>
              <Paper sx={{ p: 5, borderRadius: 5, border: "2px solid black" }}>
                {question && (
                  <>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Question
                          question={question.question}
                          options={question.options}
                          onSelectionHandler={onSelectionHandler}
                          disabled={isTimerRunning}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box display="flex" justifyContent="center"></Box>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default FastestFinger;
