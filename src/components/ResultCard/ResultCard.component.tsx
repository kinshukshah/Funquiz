import { Button, Grid, Typography } from "@material-ui/core";
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
            let bgColor = "#edf2f7";
            if (quiz.isCorrect) {
              if (quiz.selectedOptionId === item._id) {
                bgColor = "lightgreen";
              }
            } else {
              if (item.isRight) {
                bgColor = "lightgreen";
              }
              if (quiz.selectedOptionId === item._id) {
                bgColor = "red";
              }
            }
            return (
              <Button
                variant="contained"
                style={{
                  backgroundColor: bgColor,
                  marginBottom: "1rem",
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
