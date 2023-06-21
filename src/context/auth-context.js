import { Replay } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

export const AuthContext = React.createContext({
  isLoggedIn: false,
  isLoadingUserData: true,
  userData: {
    id: null,
    firstName: "",
    lastName: "",
  },
  setIsLoggedIn: (isLoggedIn) => {},
  setUserData: (userData) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoadingUserData, setIsLoadingUserData] = useState(true);

  useEffect(() => {
    try {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        setIsLoadingUserData(false);
        return;
      }

      const userDataParsed = JSON.parse(userData);
      setUserData(userDataParsed);
      setIsLoggedIn(true);
      setIsLoadingUserData(false);
    } catch (error) {
      setIsLoadingUserData(false);
      logout();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    setUserData(null);
  };

  const login = (userData) => {
    try {
      localStorage.setItem("userData", JSON.stringify(userData));
      setIsLoggedIn(true);
      setUserData(userData);
    } catch (error) {
      logout();
    }
  };

  const refreshData = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsLoggedIn(true);
    setUserData(userData);
  };

  const value = {
    isLoggedIn,
    userData,
    setIsLoggedIn,
    setUserData,
    logout,
    login,
    refreshData,
    isLoadingUserData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
