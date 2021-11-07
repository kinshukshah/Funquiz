import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext/userContext";

export const PrivateRoute = ({
  path,
  children,
}: {
  path: string;
  children: JSX.Element;
}) => {
  const { user } = useUser();
  return user ? (
    children
  ) : (
    <Navigate state={{ from: { pathName: path } }} replace to="/signin" />
  );
};
