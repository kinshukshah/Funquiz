import React from "react";
import { useParams } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext/quizContext";
import { CheckIsValidQuizId } from "../../utils/functions.utils";
import { Navigate } from "react-router-dom";
import { DisplayQuiz } from "../../components/DisplayQuiz/displayQuiz.component";
export const Quiz = () => {
  let { quizId } = useParams();
  const { quizList } = useQuiz();
  const isQuizExists = quizList && CheckIsValidQuizId(quizId, quizList);
  console.log({ quizList, isQuizExists });
  if (quizList && !isQuizExists) {
    return <Navigate replace to="/" />;
  }

  return <DisplayQuiz quizId={quizId} />;
};
