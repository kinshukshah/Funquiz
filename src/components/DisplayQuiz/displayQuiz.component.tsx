import { Container, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useQuiz } from "../../context/QuizContext/quizContext";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { QuizCard } from "../QuizCard/quizCard.component";
import { DisplayResults } from "../DisplayResults/DisplayResults.component";

export type DisplayQuiz = {
  quizId: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: "100%",
      height: "100%",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    ScoreContainer: {
      backgroundColor: theme.palette.grey[100],
      padding: "10px",
      marginBottom: "10px",
      color: theme.palette.text.primary,
    },
  })
);

export const DisplayQuiz = ({ quizId }: DisplayQuiz) => {
  const classes = useStyles();
  const { quizList, currentQuestion, quizState, dispatchQuiz } = useQuiz();
  const [displayResult, setDisplayResult] = useState<boolean>(false);
  console.log({ quizState });
  return (
    <Container maxWidth="md" style={{ textAlign: "center" }}>
      {!displayResult ? (
        <>
          <Grid container className={classes.ScoreContainer}>
            <Grid item xs={6}>
              <Typography variant="button">
                Current Score: {quizState.score}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="button">
                Question No: {currentQuestion + 1} / {quizList?.quizList.length}
              </Typography>
            </Grid>
          </Grid>
          <QuizCard setDisplayResult={setDisplayResult} />
        </>
      ) : (
        <DisplayResults />
      )}
    </Container>
  );
};
