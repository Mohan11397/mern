import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const isAllowed = document?.cookie && document?.cookie === "cache-x=true";
  const [tasks, setTasks] = useState({
    isLoggedIn: isAllowed,
  });

  return (
    <AppContext.Provider value={{ tasks, setTasks }}>
      {children}
    </AppContext.Provider>
  );
};
