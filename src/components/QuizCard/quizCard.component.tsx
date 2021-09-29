import React, { Dispatch } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useQuiz } from "../../context/QuizContext/quizContext";
import { GetCurrentQuizList } from "../../utils/functions.utils";
import { CardMedia, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 640,
    borderRadius: "1.5rem",
    minHeight: 500,
    border: 0,
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
  divroot: {
    margin: "auto",
  },
  media: {
    height: 250,
    width: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  },
  disableOptions: {
    pointerEvents: "none",
    cursor: "no-drop",
  },
});
export const QuizCard = ({
  setDisplayResult,
}: {
  setDisplayResult: Dispatch<boolean>;
}) => {
  const {
    quizList,
    quizState,
    currentQuestion,
    setCurrentQuestion,
    dispatchQuiz,
  } = useQuiz();
  const classes = useStyles();
  const currentQuizInfo =
    quizList && GetCurrentQuizList(quizState.quizId, quizList);
  console.log({ currentQuizInfo, currentQuestion });
  const getCurrentQuestion =
    currentQuizInfo && currentQuizInfo.questionsList[currentQuestion];
  const [selectedOption, setselectedOption] = useState<string>("");
  const [selectedValueIsRight, setSelectedValueIsRight] =
    useState<boolean>(false);
  const isLastQuestion =
    currentQuizInfo && currentQuizInfo.totalQuestions === currentQuestion + 1;
  console.log({ getCurrentQuestion, isLastQuestion });
  useEffect(() => {
    if (selectedOption && getCurrentQuestion) {
      setTimeout(() => {
        if (!isLastQuestion) {
          setCurrentQuestion((current) => current + 1);
          dispatchQuiz({
            type: "UPDATE_SCORE",
            payload: {
              updateScore: selectedValueIsRight
                ? getCurrentQuestion.positiveMarks
                : getCurrentQuestion.negativeMarks,
              isCorrect: selectedValueIsRight,
            },
          });
          dispatchQuiz({
            type: "ADD_TO_ANSWER_LIST",
            payload: {
              answer: {
                questionId: getCurrentQuestion._id,
                isCorrect: selectedValueIsRight,
                selectedOptionId: selectedOption,
              },
            },
          });
          setselectedOption("");
        } else {
          dispatchQuiz({
            type: "UPDATE_SCORE",
            payload: {
              updateScore: selectedValueIsRight
                ? getCurrentQuestion.positiveMarks
                : getCurrentQuestion.negativeMarks,
              isCorrect: selectedValueIsRight,
            },
          });
          dispatchQuiz({
            type: "ADD_TO_ANSWER_LIST",
            payload: {
              answer: {
                questionId: getCurrentQuestion._id,
                isCorrect: selectedValueIsRight,
                selectedOptionId: selectedOption,
              },
            },
          });
          setselectedOption("");
          setDisplayResult(true);
        }
      }, 500);
    }
  }, [selectedOption]);
  return (
    <Grid item container xs={12}>
      <Grid item xs={12}>
        <CardMedia
          image={getCurrentQuestion?.questionImage}
          className={classes.media}
        ></CardMedia>
        <Typography variant="h6" style={{ margin: "10px 0px" }} align="center">
          {getCurrentQuestion?.question}
        </Typography>
      </Grid>
      <div
        style={{ width: "100%" }}
        className={selectedOption ? classes.disableOptions : ""}
      >
        {getCurrentQuestion?.options.map((item, id) => {
          let bgcolor;
          if (selectedOption) {
            if (selectedValueIsRight && selectedOption === item._id) {
              bgcolor = "lightgreen";
            }
            if (!selectedValueIsRight) {
              if (selectedOption === item._id) {
                bgcolor = "red";
              } else if (item.isRight) {
                bgcolor = "lightgreen";
              } else {
                bgcolor = "#edf2f7";
              }
            }
          } else {
            bgcolor = "#edf2f7";
          }

          return (
            <Button
              variant="contained"
              style={{
                backgroundColor: bgcolor,
                marginBottom: "1rem",
              }}
              size="large"
              fullWidth={true}
              onClick={() => {
                console.log(item);
                setselectedOption(item._id);
                setSelectedValueIsRight(item.isRight);
              }}
              key={item._id}
            >
              {item.value}
            </Button>
          );
        })}
      </div>
    </Grid>
  );
};
