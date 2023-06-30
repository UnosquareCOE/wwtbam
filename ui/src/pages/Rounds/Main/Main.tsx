import { useState, useEffect } from "react";
import Question from "./components/Question";
import MoneyLadder from "./components/MoneyLadder";
import { moneyLevels } from "./components/MoneyLevels";
import Lifeline from "./components/Lifeline";
import Timer from "../../../components/Timer";
import FinalAnswerButton from "./components/FinalAnswerButton";
import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import NavigationRoutes from "../../../constants/routes";
import AppBar from "../../../components/AppBar";
import { Questions } from "../../../interfaces/Interfaces";
import QuestionService from "../../../services/QuestionsService";

const Main = () => {
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("Congratulations");
  const [secondModalMessage, setSecondModalMessage] = useState("You won");
  const [question, setQuestion] = useState<Questions[] | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(15);
  const [moneyLevel, setMoneyLevel] = useState(0);
  const [trivia, setTrivia] = useState<Questions[] | null>(null);
  let gotQuestions: Questions[];
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedOption(null);
  }, [currentQuestionIndex]);

  useEffect(() => {
    fetchData().then(() => {
      setQuestion(gotQuestions);
      console.log(gotQuestions);
    });
  }, []);

  const fetchData = async () => {
    try {
      gotQuestions = await QuestionService.fetchQuestions();
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const getCurrentQuestion = () => {
    if (question !== null) {
      if (currentQuestionIndex >= question.length) {
        return null;
      }
      return question[currentQuestionIndex];
    }
  };

  const getRandomIndexes = (
    count: number,
    range: number,
    correctIndex: number
  ) => {
    const indexes = new Set();
    while (indexes.size < count) {
      const randomIndex = Math.floor(Math.random() * range);
      if (randomIndex !== correctIndex) {
        indexes.add(randomIndex);
      }
    }
    return Array.from(indexes);
  };

  const handleFiftyFifty = () => {
    if (currentQuestion) {
      const correctAnswerIndex = currentQuestion.options.findIndex(
        (option) => option === currentQuestion.correctAnswer
      );
      const incorrectOptions = currentQuestion.options.filter(
        (option) => option !== currentQuestion.correctAnswer
      );

      const randomIndexes = getRandomIndexes(
        2,
        incorrectOptions.length,
        correctAnswerIndex
      );
      const updatedOptions = currentQuestion.options.map((option, index) => {
        if (randomIndexes.includes(index)) {
          return null;
        }
        return option;
      });

      const newOptions = updatedOptions.filter((option) => option !== null);

      setQuestion((prevQuestion) => {
        if (prevQuestion) {
          const updatedQuestion = { ...prevQuestion[currentQuestionIndex] };
          updatedQuestion.options = newOptions;
          const newQuestionList = [...prevQuestion];
          newQuestionList[currentQuestionIndex] = updatedQuestion;
          return newQuestionList;
        }
        return null;
      });
    }
  };

  const handlePhoneFriend = () => {
    console.log("Phone a Friend lifeline triggered!");
  };

  const handleAskAudience = () => {
    console.log("Ask The Audience lifeline triggered!");
  };

  const handleNewQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedOption(null);
  };

  const handleResetGame = () => {
    setCurrentQuestionIndex(0);
    setCurrentLevel(16);
  };

  const handleGameOver = () => {
    setModalMessage(`You Lost`);
    setSecondModalMessage(`The Answer was ${currentQuestion?.correctAnswer}`);
    setOpen(true);
  };

  const handleTimesUp = () => {
    setModalMessage(`Time's Up`);
    setSecondModalMessage(`You took too long to answer`);
    setOpen(true);
  };

  const handleBackToLobby = () => {
    navigate(-3);
  };

  const handleNewGame = () => {
    navigate(-2);
  };

  const handleCorrectAnswer = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setCurrentLevel(currentLevel - 1);
    setMoneyLevel(currentLevel - currentQuestionIndex + 1);
  };

  const currentQuestion = getCurrentQuestion();

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
            Who wants to be a Rich Unicorn
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ paddingX: 4 }}>
        <Grid container spacing={4} direction="row">
          <Grid item xs={3}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              marginY={10}
              sx={{ pt: 18 }}
            >
              <Box marginBottom={4}>
                <Timer
                  key={currentQuestionIndex}
                  isRunning={true}
                  time={60}
                  handleEndTimer={handleTimesUp}
                />
              </Box>
              <Lifeline
                phoneAFriend={handlePhoneFriend}
                askTheAudience={handleAskAudience}
                fiftyFifty={handleFiftyFifty}
                newQuestion={handleNewQuestion}
              />
            </Box>
          </Grid>
          <Grid item xs={7} direction="row">
            <Modal open={open}>
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
                  borderRadius: 5,
                  border: "3px solid black",
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  align="center"
                  color="#000000"
                  gutterBottom
                >
                  {modalMessage}
                </Typography>
                <Typography
                  variant="h2"
                  component="h2"
                  align="center"
                  color="darkblue"
                  fontWeight="bold"
                ></Typography>
                <Typography
                  variant="h6"
                  component="h2"
                  align="center"
                  color="#000000"
                  gutterBottom
                >
                  {secondModalMessage}
                </Typography>
                <Typography
                  variant="h6"
                  component="h2"
                  align="center"
                  color="#000000"
                  gutterBottom
                ></Typography>
                <Box
                  display="flex"
                  justifyContent="center"
                  flexDirection="column"
                  alignItems="center"
                  marginTop={4}
                >
                  <Box marginTop={2} width="90%">
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleNewGame}
                    >
                      New Game
                    </Button>
                  </Box>
                  <Box marginTop={2} paddingBottom={2} width="90%">
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={handleBackToLobby}
                    >
                      End
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Modal>
            <Box display="flex" justifyContent="center" marginY={25}>
              <Paper sx={{ p: 5, borderRadius: 5, border: "2px solid black" }}>
                {currentQuestion && (
                  <>
                    <Grid container spacing={4}>
                      <Grid item xs={12}>
                        <Question
                          question={currentQuestion.question}
                          category={currentQuestion.category}
                          difficulty={currentQuestion.difficulty}
                          options={currentQuestion.options}
                          selectedOption={selectedOption}
                          onOptionSelect={handleOptionSelect}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                          <FinalAnswerButton
                            selectedOption={selectedOption}
                            correctAnswer={currentQuestion.correctAnswer}
                            onFinalAnswer={handleCorrectAnswer}
                            onIncorrectGuess={handleGameOver}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ pt: 8 }}>
              <MoneyLadder levels={moneyLevels} currentLevel={currentLevel} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Main;
