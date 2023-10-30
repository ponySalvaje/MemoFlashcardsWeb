import { useAuthContext } from "../hooks/useAuthContext";
import Login from "../pages/login/Login";

const Protected = ({ children }) => {
  const { user } = useAuthContext();
  return user ? children : <Login />;
};

export default Protected;
