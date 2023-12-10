import { useAuthContext } from "../hooks/useAuthContext";
import Login from "../pages/login/Login";
import PageContainer from "./PageContainer";

const Protected = ({ children }) => {
  const { user } = useAuthContext();
  return user ? children : <PageContainer element={<Login />} />;
};

export default Protected;
