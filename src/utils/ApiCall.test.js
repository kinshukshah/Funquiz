import axios from "axios";
import {
  GetAllQuizes,
  saveQuizResults,
  UserSignIn,
  UserSignUp,
} from "./ApiCall.utils";
jest.mock("axios");
describe("testing user signin functionality", () => {
  test("should return a user when ApiCall is successfull", async () => {
    axios.post.mockResolvedValue({
      data: {
        name: "Ubuntu",
        age: "22",
      },
    });
    const user = await UserSignIn();

    expect(user).toEqual({
      name: "Ubuntu",
      age: "22",
    });
  });

  test("should return a user when ApiCall is unsuccessfull", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          success: false,
          error: "error message",
        },
      },
    });
    axios.isAxiosError.mockImplementation(() => true);
    const user = await UserSignIn();
    expect(user).toEqual({
      success: false,
      error: "error message",
    });
  });

  test("should return a user when ApiCall is unsuccessfull & not axios Error", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          success: false,
          error: "error message",
        },
      },
    });
    axios.isAxiosError.mockImplementation(() => false);
    const user = await UserSignIn();
    expect(user).toEqual({
      success: false,
      error: "Something Went Wrong",
    });
  });
});

describe("testing user signup functionality", () => {
  test("should return a user when ApiCall is successfull", async () => {
    axios.post.mockResolvedValue({
      data: {
        name: "Ubuntu",
        age: "22",
      },
    });
    const user = await UserSignUp();

    expect(user).toEqual({
      name: "Ubuntu",
      age: "22",
    });
  });

  test("should return a user when ApiCall is unsuccessfull", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          success: false,
          error: "error message",
        },
      },
    });
    axios.isAxiosError.mockImplementation(() => true);
    const user = await UserSignUp();
    expect(user).toEqual({
      success: false,
      error: "error message",
    });
  });

  test("should return a user when ApiCall is unsuccessfull & not axios Error", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          success: false,
          error: "error message",
        },
      },
    });
    axios.isAxiosError.mockImplementation(() => false);
    const user = await UserSignUp();
    expect(user).toEqual({
      success: false,
      error: "Something Went Wrong",
    });
  });
});

describe("testing GetAllQuizes functionality", () => {
  test("should return list of quizes when ApiCall is successfull", async () => {
    axios.get.mockResolvedValue({
      data: {
        success: true,
        quizList: [],
      },
    });
    const quizes = await GetAllQuizes();
    expect(quizes).toEqual({
      success: true,
      quizList: [],
    });
  });

  test("should return a error when ApiCall is unsuccessfull", async () => {
    axios.get.mockRejectedValue({
      response: {
        data: {
          success: false,
          error: "error message",
        },
      },
    });
    axios.isAxiosError.mockImplementation(() => true);
    const quizes = await GetAllQuizes();
    expect(quizes).toEqual({
      success: false,
      error: "error message",
    });
  });

  test("should return a error when ApiCall is unsuccessfull & not axios Error", async () => {
    axios.get.mockRejectedValue({
      response: {
        data: {
          success: false,
          error: "error message",
        },
      },
    });
    axios.isAxiosError.mockImplementation(() => false);
    const quizes = await GetAllQuizes();
    expect(quizes).toEqual({
      success: false,
      error: "Something Went Wrong",
    });
  });
});

describe("testing saving result functionality", () => {
  test("should return user data when ApiCall is successfull", async () => {
    axios.post.mockResolvedValue({
      data: {
        success: true,
        user: { email: "kshah@gmail.com" },
      },
    });
    const userInfo = await saveQuizResults({}, { user: { _id: "123" } });
    expect(userInfo).toEqual({
      success: true,
      user: { email: "kshah@gmail.com" },
    });
  });

  test("should return a error when ApiCall is unsuccessfull", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          success: false,
          error: "error message",
        },
      },
    });
    axios.isAxiosError.mockImplementation(() => true);
    const userInfo = await saveQuizResults({}, { user: { _id: "123" } });
    expect(userInfo).toEqual({
      success: false,
      error: "error message",
    });
  });

  test("should return a error when ApiCall is unsuccessfull & not axios Error", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: {
          success: false,
          error: "error message",
        },
      },
    });
    axios.isAxiosError.mockImplementation(() => false);
    const userInfo = await saveQuizResults({}, { user: { _id: "123" } });
    expect(userInfo).toEqual({
      success: false,
      error: "Something Went Wrong",
    });
  });
});
