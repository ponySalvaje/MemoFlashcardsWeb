import { role } from "../common/constants/role";
import Loading from "../components/loading/Loading";
import { useAuthContext } from "../hooks/useAuthContext";
import Login from "../pages/login/Login";
import PageContainer from "./PageContainer";

const AdminProtected = ({ children }) => {
  const { user } = useAuthContext();
  return user ? (
    user[2] === role.admin ? (
      children
    ) : (
      <PageContainer element={<Login />} />
    )
  ) : (
    <Loading />
  );
};

export default AdminProtected;
