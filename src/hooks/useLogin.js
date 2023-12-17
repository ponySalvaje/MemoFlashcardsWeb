import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { signIn } from "../api/auth.api";
import { storeToken } from "../services/indexedDB/tokenService";
import { storeUserData } from "../services/indexedDB/userService";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await signIn(email, password);
      await storeToken(response.token);
      await storeUserData({ fullName: response.fullName, role: response.role });
      dispatch({
        type: "LOGIN",
        payload: [response.token, response.fullName, response.role],
      });
      setIsLoading(false);
    } catch (ex) {
      setIsLoading(false);
      setError(ex);
    }
  };

  return { login, isLoading, error };
};
