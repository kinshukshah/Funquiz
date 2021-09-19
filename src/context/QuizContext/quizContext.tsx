import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import { INITIAL_STATE, QuizReducer } from "../../reducers/quizReducer";
import { QuizContextTypes, Quizes, QuizProviderProps } from "./quiz.types";
import { GetAllQuizes } from "../../utils/ApiCall.utils";
export const QuizContext = createContext<QuizContextTypes>(
  {} as QuizContextTypes
);

export const QuizProvider = ({ children }: QuizProviderProps): JSX.Element => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [quizList, setQuizList] = useState<Quizes | null>(null);
   const [quizState, dispatchQuiz] = useReducer(QuizReducer, INITIAL_STATE);
  useEffect(() => {
    (async function () {
      const quizes = await GetAllQuizes();
      console.log(quizes);
      if ("error" in quizes) {
        return alert("Error" + quizes.error);
      } else {
        return setQuizList(quizes);
      }
    })();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        setCurrentQuestion,
        quizList,
        setQuizList,
        quizState,
        dispatchQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
