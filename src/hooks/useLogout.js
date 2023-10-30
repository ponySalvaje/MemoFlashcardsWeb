import { removeToken } from "../services/indexedDB/tokenService";
import { removeUserData } from "../services/indexedDB/userService";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    await removeToken();
    await removeUserData();
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
