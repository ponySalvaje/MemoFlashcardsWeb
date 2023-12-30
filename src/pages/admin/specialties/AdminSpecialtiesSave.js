import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { getAdminSpecialty } from "../../../api/admin.specialty.api";
import AdminSpecialtyForm from "./AdminSpecialtyForm";
import Loading from "../../../components/loading/Loading";

const AdminSpecialtiesSave = () => {
  const [specialty, setSpecialty] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const loadSpecialty = async (id) => {
      try {
        const specialtyData = (await getAdminSpecialty(id)).data;
        setSpecialty(specialtyData);
      } catch (error) {
        console.error("Error loading topics:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadSpecialty(id);
    } else {
      setLoading(false);
    }
  }, [id]);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <AdminSpecialtyForm id={id} name={specialty ? specialty.title : ""} />
    </Container>
  );
};

export default AdminSpecialtiesSave;
