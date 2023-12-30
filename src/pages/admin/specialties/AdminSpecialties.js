import { useState, useEffect } from "react";
import { getAdminSpecialties } from "../../../api/admin.specialty.api";
import { Container } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { useNavigate } from "react-router-dom";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";
import DataTable from "../../../components/data-table/DataTable";
import DataTableTitle from "../../../components/data-table-title/DataTableTitle";

const AdminSpecialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin/topics/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/specialties/save/${id}`);
  };

  const handleDelete = (id) => {
    console.log("handle delete: ", id);
  };

  const handleCreateSpecialty = () => {
    navigate(`/admin/specialties/save/`);
  };

  const loadSpecialties = async () => {
    try {
      const specialtiesData = (await getAdminSpecialties()).data;
      setSpecialties(specialtiesData);
    } catch (error) {
      console.error("Error loading specialties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpecialties();
  }, []);

  const specialtiesHeaders = ["#", "Especialidad", "Temas", "Acciones"];

  const renderSpecialties = (
    page,
    itemsPerPage,
    handleView,
    handleEdit,
    handleDelete
  ) => {
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSpecialties = specialties.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return currentSpecialties.map((specialty) => (
      <tr key={specialty.id}>
        <td>{specialty.id}</td>
        <td>{specialty.title}</td>
        <td>{specialty.subjectsCount}</td>
        <td>
          <TableActionButtons
            itemId={specialty.id}
            handleView={handleView}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </td>
      </tr>
    ));
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <DataTableTitle
            title="Especialidades"
            action="Crear Especialidad"
            onClick={handleCreateSpecialty}
          />
          <DataTable
            headers={specialtiesHeaders}
            renderData={renderSpecialties}
            itemsCount={specialties.length}
            handleView={handleView}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
    </Container>
  );
};

export default AdminSpecialties;
