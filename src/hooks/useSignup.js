import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { register } from "../api/auth.api";
import { storeUserData } from "../services/indexedDB/userService";
import { storeToken } from "../services/indexedDB/tokenService";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await register(data);
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

  return { signup, isLoading, error };
};
