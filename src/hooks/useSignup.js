import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { register } from "../api/auth.api";
import { storeUserData } from "../services/indexedDB/userService";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await register(data);
      const token = response.token;
      const fullName = response.fullName;
      await storeToken(token);
      await storeUserData(fullName);
      dispatch({ type: "LOGIN", payload: token });
      setIsLoading(false);
    } catch (ex) {
      setIsLoading(false);
      setError(ex);
    }
  };

  return { signup, isLoading, error };
};
