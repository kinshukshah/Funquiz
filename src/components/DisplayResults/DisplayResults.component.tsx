import { CardMedia, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useQuiz } from "../../context/QuizContext/quizContext";
import { GetCurrentQuizList } from "../../utils/functions.utils";
import { ResultAction } from "../ResultAction/resultAction.component";
import { ResultCard } from "../ResultCard/ResultCard.component";

export const DisplayResults = () => {
  const { quizState, quizList } = useQuiz();
  const QuizInfo = quizList && GetCurrentQuizList(quizState.quizId, quizList);
  console.log({ QuizInfo });
  return (
    <Grid item container xs={12}>
      <Grid item xs={12}>
        <Typography variant="h6" style={{ margin: "10px 0px" }} align="center">
          {`Score ${quizState.score}/25`}
        </Typography>
        {quizState.answerList.map((item) => {
          return (
            <>
              <ResultCard quiz={item} quizInfo={QuizInfo} />
            </>
          );
        })}
      </Grid>
      <ResultAction />
    </Grid>
  );
};
