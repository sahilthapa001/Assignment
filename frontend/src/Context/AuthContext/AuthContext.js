import { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  token: null,
  setToken: () => {},
  setUser: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("userToken");
      if (storedToken) {
        setToken(storedToken);
      }
    } catch (error) {
      console.error("Error retrieving token from localStorage:", error);
    }
  }, []);

  const logout = () => {
    try {
      localStorage.removeItem("userToken");
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Error removing token from localStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, setToken, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
