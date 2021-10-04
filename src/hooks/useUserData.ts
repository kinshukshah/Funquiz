import React, { useState } from "react";
import { useNavigate } from "react-router";
import { LocationState } from "../context/UserContext/user.types";
import { useUser } from "../context/UserContext/userContext";
import { UserSignIn } from "../utils/ApiCall.utils";
export const useUserData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    locationState: LocationState
  ) => {
    event.preventDefault();
    setLoading(true);
    const { from } = locationState;
    const formdata = new FormData(event.currentTarget);
    const data = {
      email: formdata.get("email") as string,
      password: formdata.get("password") as string,
    };
    const isUserSignIn = await UserSignIn(data);
    if ("error" in isUserSignIn) {
      alert("Error" + isUserSignIn.error);
      setError(isUserSignIn.error);
      setLoading(false);
    } else {
      setUser(isUserSignIn);
      console.log({ isUserSignIn });
      console.log({ from });
      navigate(from.pathName);
    }
  };
  return { handleSubmit, loading, setLoading, error, setError };
};
