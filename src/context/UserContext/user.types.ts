import React from "react";
import { QuizReducerInitialStateType } from "../QuizContext/quiz.types";

export type UserProviderProps = {
  children: React.ReactNode;
};
export type UserDataType = {
  name: string;
  email: string;
  takenQuizList: QuizReducerInitialStateType[];
  _id: string;
};

export type UserType = {
  user: UserDataType;
  success: boolean;
};

export type UserSignUpType = {
  name: string;
  email: string;
  password: string;
};

export type UserSignInType = {
  email: string;
  password: string;
};

export type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export type LocationState = {
  from: {
    pathName: string;
  };
};
