import { Grid, Typography } from "@mui/material";
import React from "react";
import { QuizReducerInitialStateType } from "../../context/QuizContext/quiz.types";
import { useQuiz } from "../../context/QuizContext/quizContext";
import { GetCurrentQuizList } from "../../utils/functions.utils";
import { ResultAction } from "../ResultAction/resultAction.component";
import { ResultCard } from "../ResultCard/ResultCard.component";

export const DisplayResults = ({
  resultData,
  resultAction,
}: {
  resultData: QuizReducerInitialStateType | null;
  resultAction: boolean;
}) => {
  const { quizList } = useQuiz();
  const QuizInfo =
    resultData && quizList && GetCurrentQuizList(resultData.quizId, quizList);
  console.log({ QuizInfo });
  return (
    <Grid item container xs={12}>
      <Grid item xs={12}>
        <Typography variant="h6" style={{ margin: "10px 0px" }} align="center">
          {`Score ${resultData?.score}/25`}
        </Typography>
        {resultData?.answerList.map((item) => {
          return (
            <>
              <ResultCard quiz={item} quizInfo={QuizInfo} />
            </>
          );
        })}
      </Grid>
      {resultAction && <ResultAction />}
    </Grid>
  );
};
