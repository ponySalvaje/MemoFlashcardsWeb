import { createContext, useReducer, useEffect } from "react";
import { getToken } from "../services/indexedDB/tokenService";
import { getUserData } from "../services/indexedDB/userService";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const userData = await getUserData();

      if (token && userData) {
        dispatch({
          type: "LOGIN",
          payload: [token, userData.fullName, userData.role],
        });
      }
    };

    fetchData();
  }, []);

  console.log("AuthContext state:", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
