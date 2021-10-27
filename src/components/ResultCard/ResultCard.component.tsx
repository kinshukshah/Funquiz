import { Button, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { AnswerListType, Quiz } from "../../context/QuizContext/quiz.types";

export const ResultCard = ({
  quiz,
  quizInfo,
}: {
  quiz: AnswerListType;
  quizInfo: Quiz | null | undefined;
}) => {
  const quizQuestion =
    quizInfo &&
    quizInfo.questionsList.find((item) => item._id === quiz.questionId);
  const theme=useTheme();
  return (
    <>
      {quizQuestion ? (
        <Grid item xs={12}>
          <Typography
            variant="h6"
            style={{ margin: "10px 0px" }}
            align="center"
          >
            {quizQuestion?.question}
          </Typography>
          {quizQuestion?.options.map((item) => {
            let bgColor = "inherit";
            if (quiz.isCorrect) {
              if (quiz.selectedOptionId === item._id) {
                bgColor = theme.palette.success.light;
              }
            } else {
              if (item.isRight) {
                bgColor = theme.palette.success.light;
              }
              if (quiz.selectedOptionId === item._id) {
                bgColor = theme.palette.error.light;
              }
            }
            return (
              <Button
                variant="contained"
                style={{
                  backgroundColor: bgColor,
                  marginBottom: "1rem",
                  color:"inherit"
                }}
                size="large"
                fullWidth={true}
                key={item._id}
              >
                {item.value}
              </Button>
            );
          })}
        </Grid>
      ) : null}
    </>
  );
};
