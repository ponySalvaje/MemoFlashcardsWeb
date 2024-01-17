import { useState, useEffect } from "react";
import {
  getAdminSpecialties,
  removeAdminSpecialty,
} from "../../../api/admin.specialty.api";
import { Container } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";
import EntityTable from "../../../components/entity-table/EntityTable";

const AdminSpecialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState(location.state);
  const [item, setItem] = useState(0);

  useEffect(() => {
    navigate(".", { replace: true });
  }, [navigate]);

  const deleteSpecialty = async () => {
    if (item) {
      try {
        await removeAdminSpecialty(item);
        loadSpecialties();
        setState({
          result: true,
          message: "¡Especialidad eliminada exitosamente!",
        });
      } catch (error) {
        setState({
          result: false,
          message:
            "Hubo un error inesperado al eliminar la especialidad. Por favor, inténtelo más tarde.",
        });
      }
    }
  };

  const loadSpecialties = async () => {
    try {
      setLoading(true);
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

  const renderSpecialties = (
    page,
    itemsPerPage,
    handleView,
    handleEdit,
    handleDelete,
    filter
  ) => {
    let filteredSpecialties = specialties;

    if (filter && filter.trim() !== "") {
      filteredSpecialties = specialties.filter((specialty) =>
        specialty.title.toLowerCase().includes(filter.toLowerCase())
      );
    }

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSpecialties = filteredSpecialties.slice(
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
        <EntityTable
          state={state}
          title="Especialidades"
          createAction="Crear Especialidad"
          createClick={() => navigate(`/admin/specialties/save/`)}
          headers={["#", "Especialidad", "Temas", "Acciones"]}
          renderData={renderSpecialties}
          itemsCount={specialties.length}
          itemList={specialties}
          viewButton={(id) => navigate(`/admin/topics/${id}`)}
          editButton={(id) => navigate(`/admin/specialties/save/${id}`)}
          deleteButton={deleteSpecialty}
          deleteHeader="¿Está seguro que desea eliminar la especialidad?"
          deleteMessage="Todos los temas y tarjetas que pertenezcan a esta especialidad también serán eliminados"
          setItem={setItem}
        />
      )}
    </Container>
  );
};

export default AdminSpecialties;
