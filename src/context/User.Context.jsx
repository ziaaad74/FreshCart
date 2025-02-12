/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const userContext = createContext("");

export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  function logOut() {
    setToken(null);
    localStorage.removeItem("token");
  }
  return (
    <userContext.Provider value={{ token, setToken, logOut }}>
      {children}
    </userContext.Provider>
  );
}
