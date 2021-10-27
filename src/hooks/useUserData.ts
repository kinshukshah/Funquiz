import React, { useState } from "react";
import { useNavigate } from "react-router";
import { LocationState } from "../context/UserContext/user.types";
import { useUser } from "../context/UserContext/userContext";
import { UserSignIn, UserSignUp } from "../utils/ApiCall.utils";
export const useUserData = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { setUser, user } = useUser();

  const handleSignInSubmit = async (
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
      navigate(from.pathName);
    }
  };  

  const handleSignUpSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    const formdata = new FormData(event.currentTarget);
    const data = {
      name: formdata.get("name") as string,
      email: formdata.get("email") as string,
      password: formdata.get("password") as string,
    };
    const res = await UserSignUp(data);
    if (res.success) {
      const isUserSignIn = await UserSignIn({
        email: formdata.get("email") as string,
        password: formdata.get("password") as string,
      });

      if ("error" in isUserSignIn) {
        alert("Error" + isUserSignIn.error);
        setError(isUserSignIn.error);
        setLoading(false);
      } else {
        setUser(isUserSignIn);
        navigate("/");
      }
    }
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };
  return {
    handleSignInSubmit,
    handleSignUpSubmit,
    handleLogout,
    loading,
    setLoading,
    error,
    setError,
    user,
  };
};
