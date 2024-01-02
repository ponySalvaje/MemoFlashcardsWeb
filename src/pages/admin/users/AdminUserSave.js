import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import { getAdminUser } from "../../../api/admin.user.api";
import AdminUserForm from "./AdminUserForm";

const AdminUsersSave = () => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const loadUser = async (id) => {
      try {
        const userData = (await getAdminUser(id)).data;
        setUser(userData);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadUser(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <AdminUserForm
        id={id}
        name={user ? user.name : ""}
        email={user ? user.email : ""}
        semester={user ? user.studentTypeId : 0}
        university={user ? user.universityId : 0}
        role={user ? user.type : ""}
        dueDate={user ? user.dueDate : ""}
      />
    </Container>
  );
};

export default AdminUsersSave;
