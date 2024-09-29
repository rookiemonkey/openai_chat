import React, { createContext, useContext } from "react";
import getRandomId from "../../utilities/getRandomId";

const AuthContext = createContext(
  {}
);

export default function AuthProvider({ children }) {

  // new mockEmail on initial connect, store the next connection unless in incognito
  let mockEmail = localStorage.getItem("mockEmail");
  const sessionId = getRandomId();

  if (!mockEmail) {
    mockEmail = `mockuser__${getRandomId()}@gmail.com`
    localStorage.setItem("mockEmail", mockEmail)
  }

  return (
    <AuthContext.Provider value={{ mockEmail, sessionId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}