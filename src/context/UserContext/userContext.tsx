import { createContext, useContext, useState, useEffect } from "react";
import { UserContextType, UserProviderProps, UserType } from "./user.types";

export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: UserProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserType | null>(null);
  useEffect(() => {
    let userStatus = JSON.parse(localStorage.getItem("user") as string);
    userStatus?.user && setUser(userStatus);
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
