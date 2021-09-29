import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext/userContext";

export const PrivateRoute = ({
  path,
  element,
}: {
  path: string;
  element: JSX.Element;
}) => {
  const { user } = useUser();
  return user ? (
    <Route element={element} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/signin" />
  );
};
