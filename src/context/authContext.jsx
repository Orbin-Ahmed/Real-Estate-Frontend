import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("User")) || null
  );

  const updateUser = (data) => {
    setUser(data);
  };

  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(user));
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
