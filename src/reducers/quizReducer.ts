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
    case "UPDATE_SCORE":
      return {
        ...state,
        score: action.payload.isCorrect
          ? state.score + action.payload.updateScore
          : state.score - action.payload.updateScore,
      };
    case "ADD_TO_ANSWER_LIST":
      return {
        ...state,
        answerList: [...state.answerList, action.payload.answer],
      };
    default:
      throw new Error("Something Went Wrong!!");
  }
};
