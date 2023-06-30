import { Box, Button, Grid } from "@mui/material";
import { FC, useState } from "react";

type LifelineProps = {
  phoneAFriend: () => void;
  askTheAudience: () => void;
  fiftyFifty: () => void;
  newQuestion: () => void;
};

const Lifeline: FC<LifelineProps> = ({
  phoneAFriend,
  askTheAudience,
  fiftyFifty,
  newQuestion,
}) => {
  const [newQuestionUsed, setNewQuestionUsed] = useState(false);
  const [fiftyFiftyUsed, setFiftyFiftyUsed] = useState(false);
  const handleAskTheAudience = () => {
    askTheAudience;
    console.log("Ask the Audience lifeline triggered!");
  };

  const handleFiftyFifty = () => {
    fiftyFifty();
    setFiftyFiftyUsed(true);
    console.log("50/50 lifeline triggered!");
  };

  const handlePhoneAFriend = () => {
    phoneAFriend;
    console.log("Phone a Friend lifeline triggered!");
  };

  const handleNewQuestion = () => {
    newQuestion();
    setNewQuestionUsed(true);
    console.log("New Question lifeline triggered!");
  };

  const askTheAudienceUsed = false;
  const phoneAFriendUsed = false;

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            onClick={handleAskTheAudience}
            disabled={askTheAudienceUsed}
            variant="contained"
            sx={{
              height: "100%",
              minHeight: "80px",
              width: "100%",
              minWidth: "120px",
              borderRadius: 3,
              border: "2px solid black",
            }}
          >
            Ask the Audience
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={handleFiftyFifty}
            disabled={fiftyFiftyUsed}
            variant="contained"
            sx={{
              height: "100%",
              minHeight: "80px",
              width: "100%",
              minWidth: "120px",
              borderRadius: 3,
              border: "2px solid black",
            }}
          >
            50/50
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={handlePhoneAFriend}
            disabled={phoneAFriendUsed}
            variant="contained"
            sx={{
              height: "100%",
              minHeight: "80px",
              width: "100%",
              minWidth: "120px",
              borderRadius: 3,
              border: "2px solid black",
            }}
          >
            Phone a Friend
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            onClick={handleNewQuestion}
            disabled={newQuestionUsed}
            variant="contained"
            sx={{
              height: "100%",
              minHeight: "80px",
              width: "100%",
              minWidth: "120px",
              borderRadius: 3,
              border: "2px solid black",
            }}
          >
            New Question
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Lifeline;
