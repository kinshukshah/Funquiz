import {
  Quizes,
  ServerError,
  QuizReducerInitialStateType,
} from "../context/QuizContext/quiz.types";
import axios, { AxiosError } from "axios";
import {
  UserSignInType,
  UserSignUpType,
  UserType,
} from "../context/UserContext/user.types";
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

export const UserSignUp = async (
  data: UserSignUpType
): Promise<ServerError | UserType> => {
  try {
    const res = await axios.post<UserType>(
      "https://funquiz-backend.kinshukshah.repl.co/api/user/register",
      data
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

export const UserSignIn = async (
  data: UserSignInType
): Promise<ServerError | UserType> => {
  try {
    const res = await axios.post<UserType>(
      "https://funquiz-backend.kinshukshah.repl.co/api/user/login",
      data
    );
    localStorage.setItem("user", JSON.stringify(res.data));
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

export const saveQuizResults = async (
  data: QuizReducerInitialStateType,
  user: UserType
): Promise<ServerError | UserType> => {
  try {
    const res = await axios.post<UserType>(
      `https://funquiz-backend.kinshukshah.repl.co/api/user/saveQuizResults/${user.user._id}`,
      data
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
