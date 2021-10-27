import axios from "axios";
import { GetAllQuizes, UserSignIn } from "./ApiCall.utils";
jest.mock("axios");
describe("testing user signin and signup functionality", () => {
  test("should return a user when ApiCall is successfull", async () => {
    axios.post.mockResolvedValue({
      data: {
        name: "Ubuntu",
        age: "22",
      },
    });
    const user = await UserSignIn();
    console.log(user);

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
    console.log(user);
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
    console.log(user);
    expect(user).toEqual({
      success: false,
      error: "Something Went Wrong",
    });
  });
});
