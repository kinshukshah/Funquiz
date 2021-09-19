import React, { Dispatch } from "react";

export type Option = {
  value: string;
  isRight: boolean;
  _id: string;
};

export type Question = {
  question: string;
  positiveMarks: number;
  negativeMarks: number;
  timeInSeconds: string;
  questionImage: string;
  options: Option[];
  explaination: string;
  _id: string;
};

export type Quiz = {
  quizName: string;
  totalTimeInMinutes: string;
  totalScore: number;
  totalQuestions: number;
  quizImage: string;
  questionsList: Question[];
  description: string;
  _id: string;
};

export type Quizes = {
  success: boolean;
  quizList: Quiz[];
};

export type ServerError = {
  success: boolean;
  error: string;
};

export type QuizReducer = {
  currentScore: number;
  currentQuestion: "";
  currentQuizId: "";
};

export type QuizContextTypes = {
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  quizList: Quizes | null;
  setQuizList: React.Dispatch<React.SetStateAction<Quizes | null>>;
  quizState: QuizReducerInitialStateType;
  dispatchQuiz: Dispatch<ActionType>;
};

export type QuizProviderProps = {
  children: React.ReactNode;
};

export type AnswerListType = {
  questionId: string;
  selectedOptionId: string;
  isCorrect: boolean;
};

export type QuizReducerInitialStateType = {
  score: number;
  quizId: string;
  answerList: AnswerListType[];
};

export type ActionType = { type: "SET_QUIZ"; payload: { quizId: string } };
