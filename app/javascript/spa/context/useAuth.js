import React, { createContext, useContext } from "react";

const AuthContext = createContext(
  {}
);

export default function AuthProvider({ children }) {

  // new mockEmail on initial connect, store the next connection unless in incognito
  let mockEmail = localStorage.getItem("mockEmail")

  if (!mockEmail) {
    mockEmail = `mockuser+${Math.random().toString(36).substring(2, 15)}@gmail.com`
    localStorage.setItem("mockEmail", mockEmail)
  }

  return (
    <AuthContext.Provider value={{ mockEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}