import { QuizReducer, INITIAL_STATE } from "./quizReducer.ts";

describe("testing quiz reducer", () => {
  it("should set Quiz Information when starting to play", () => {
      //Arrange
    const action = {
      type: "SET_QUIZ",
      payload: { quizId: "123" },
    };
    //Act
    const quizState = QuizReducer(INITIAL_STATE, action);
    //Assert
    expect(quizState).toEqual({
      score: 0,
      answerList: [],
      quizId: "123",
    });
  });
  it("should add or subtract the score based on the answer is right or wrong", () => {
    const action = {
      type: "UPDATE_SCORE",
      payload: {
        updateScore: 5,
        isCorrect: true,
      },
    };
    const INITIAL_STATE = {
      score: 0,
      quizId: "123",
      answerList: [],
    };
    const quizState = QuizReducer(INITIAL_STATE, action);
    expect(quizState).toEqual({
      score: 5,
      quizId: "123",
      answerList: [],
    });
    const updatedAction = {
      type: "UPDATE_SCORE",
      payload: {
        updateScore: 5,
        isCorrect: false,
      },
    };
    const updatedQuizState = QuizReducer(quizState, updatedAction);
    expect(updatedQuizState).toEqual({
      score: 0,
      quizId: "123",
      answerList: [],
    });
  });
  it("store user answers", () => {
    const action = {
      type: "ADD_TO_ANSWER_LIST",
      payload: {
        answer: {
          questionId: "12464fg54",
          selectedOptionId: "4262g09",
          isCorrect: true,
        },
      },
    };
    const INITIAL_STATE = {
      score: 5,
      quizId: "123",
      answerList: [],
    };
    const quizState = QuizReducer(INITIAL_STATE, action);
    expect(quizState).toEqual({
      score: 5,
      quizId: "123",
      answerList: [
        {
          questionId: "12464fg54",
          selectedOptionId: "4262g09",
          isCorrect: true,
        },
      ],
    });
  });
});
