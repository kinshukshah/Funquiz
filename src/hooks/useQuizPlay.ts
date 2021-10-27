import React, { Dispatch, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useQuiz } from "../context/QuizContext/quizContext";
import { useUser } from "../context/UserContext/userContext";
import { saveQuizResults } from "../utils/ApiCall.utils";
import { GetCurrentQuizList } from "../utils/functions.utils";

export const useQuizPlay = (setDisplayResult?: Dispatch<boolean>) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [resultSaved, setResultSaved] = useState<boolean>(false);
  const [selectedOption, setselectedOption] = useState<string>("");
  const [selectedValueIsRight, setSelectedValueIsRight] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const { setUser, user } = useUser();
  const {
    quizState,
    currentQuestion,
    dispatchQuiz,
    quizList,
    setCurrentQuestion,
    setQuizList,
  } = useQuiz();

  const handleSaveResults = async () => {
    if (user) {
      setLoading(true);
      const res = await saveQuizResults(quizState, user);
      console.log({ res });
      if ("error" in res) {
        alert("Something Went wrong" + res.error);
        setLoading(false);
      } else {
        setUser(res);
        localStorage.setItem("user", JSON.stringify(res));
        setLoading(false);
        setResultSaved(true);
      }
    } else {
      navigate("/signin", {
        state: { from: { pathName: `/quiz/${quizState.quizId}` } },
      });
    }
  };

  const handlePlayMoreQuiz = () => {
    navigate("/");
  };

//   const flushQuizData=() =>{
//       setCurrentQuestion(0);
//       dispatchQuiz({type:""})
//   }

  const currentQuizInfo =
    quizList && GetCurrentQuizList(quizState.quizId, quizList);
  const getCurrentQuestion =
    currentQuizInfo && currentQuizInfo.questionsList[currentQuestion];
  const isLastQuestion =
    currentQuizInfo && currentQuizInfo.totalQuestions === currentQuestion + 1;

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
          setDisplayResult && setDisplayResult(true);
        }
      }, 3000);
    }
  }, [selectedOption]);

  return {
    loading,
    error,
    resultSaved,
    handleSaveResults,
    handlePlayMoreQuiz,
    currentQuizInfo,
    getCurrentQuestion,
    isLastQuestion,
    selectedOption,
    selectedValueIsRight,
    setselectedOption,
    setSelectedValueIsRight,
  };
};
