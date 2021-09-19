import {
  ActionType,
  QuizReducerInitialStateType,
} from "../context/QuizContext/quiz.types";

export const INITIAL_STATE: QuizReducerInitialStateType = {
  score: 0,
  quizId: "",
  answerList: [],
};

export const QuizReducer = (
  state: QuizReducerInitialStateType,
  action: ActionType
) => {
  switch (action.type) {
    case "SET_QUIZ":
      return {
        ...state,
        quizId: action.payload.quizId,
      };
    default:
      throw new Error("Something Went Wrong!!");
  }
};
