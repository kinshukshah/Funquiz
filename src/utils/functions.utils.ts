import { Quizes } from "../context/QuizContext/quiz.types";

export const CheckIsValidQuizId = (
  quizId: string,
  quizList: Quizes
): boolean => {
  let isExists = quizList.quizList.find(({ _id }) => _id === quizId);
  return isExists ? true : false;
};

export const GetCurrentQuizList = (quizId: string, quizList: Quizes) => {
  let currentQuiz = quizList.quizList.find(({ _id }) => _id === quizId);
  return currentQuiz;
};
