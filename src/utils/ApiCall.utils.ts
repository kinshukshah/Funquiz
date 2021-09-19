import { Quizes, ServerError } from "../context/QuizContext/quiz.types";
import axios, { AxiosError } from "axios";
export const GetAllQuizes = async (): Promise<Quizes | ServerError> => {
  try {
    const res = await axios.get<Quizes>(
      "https://funquiz-backend.kinshukshah.repl.co/api/quiz"
    );
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverErr = error as AxiosError<ServerError>;
      if (serverErr && serverErr.response) {
        return serverErr.response.data;
      }
    }
    console.log(error);
    return { success: false, error: "Something Went Wrong" };
  }
};
