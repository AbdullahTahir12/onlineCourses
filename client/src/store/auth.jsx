import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const authorizationToken = `Bearer ${token}`;
  const storetokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };
  let isLoggedIn = !!token;

  //   to check whether is loggedIn or not
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setIsLoading(false);
        console.log("User data:", data.userData);
      } else {
        setIsLoading(false);
        console.error("Error fetching user data:", response.statusText);
      }
    } catch (err) {
      console.error("Error during user authentication:", err);
    }
  };

  const getServiceData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data.msg);
        setServices(data.msg);
      } else {
        console.error("Error fetching service data");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getServiceData();
    userAuthentication();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        storetokenInLS,
        isLoggedIn,
        LogoutUser,
        user,
        services,
        authorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of provider");
  }
  return authContextValue;
};
