import React, { useState } from "react";
import { useQuiz } from "../../context/QuizContext/quizContext";
import { QuizCard } from "../QuizCard/quizCard.component";
import { DisplayResults } from "../DisplayResults/DisplayResults.component";
import { GetCurrentQuizList } from "../../utils/functions.utils";
import { Container, Grid, Typography } from "@mui/material";

export type DisplayQuiz = {
  quizId: string | undefined;
};

export const DisplayQuiz = ({ quizId }: DisplayQuiz) => {
  const { quizList, currentQuestion, quizState } = useQuiz();
  const [displayResult, setDisplayResult] = useState<boolean>(
    currentQuestion === 4
  );

  console.log({ displayResult });
  // useEffect(() => {
  //   console.log({ currentQuestion });
  //   if (currentQuestion === 4) {
  //     setDisplayResult(true);
  //   }
  // }, []);
  const currQuiz = quizList && GetCurrentQuizList(quizState.quizId, quizList);
  return (
    <Container maxWidth="md" style={{ textAlign: "center" }}>
      {!displayResult ? (
        <>
          <Grid
            container
            sx={{
              backgroundColor: "inherit",
              padding: "10px",
              marginBottom: "10px",
              color: "inherit",
            }}
          >
            <Grid item xs={6}>
              <Typography variant="button">
                Current Score: {quizState.score}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="button">
                Question No: {currentQuestion + 1} / {currQuiz?.totalQuestions}
              </Typography>
            </Grid>
          </Grid>
          <QuizCard setDisplayResult={setDisplayResult} />
        </>
      ) : (
        <DisplayResults resultData={quizState} resultAction={true} />
      )}
    </Container>
  );
};
