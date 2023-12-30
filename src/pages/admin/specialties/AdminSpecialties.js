import { useState, useEffect } from "react";
import {
  getAdminSpecialties,
  removeAdminSpecialty,
} from "../../../api/admin.specialty.api";
import { Alert, Container } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";
import DataTable from "../../../components/data-table/DataTable";
import DataTableTitle from "../../../components/data-table-title/DataTableTitle";
import RemoveElementModal from "../../../components/remove-element-modal/RemoveElementModal";

const AdminSpecialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showRemove, setShowRemove] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState(location.state);
  const [item, setItem] = useState(0);

  useEffect(() => {
    navigate(".", { replace: true });
  }, [navigate]);

  const deleteSpecialty = async () => {
    setShowRemove(false);
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
          {state && (
            <Alert variant={state.result ? "primary" : "danger"} dismissible>
              <b>
                {state.result
                  ? "Operación completada con éxito"
                  : "¡Ups! Algo salió mal."}
              </b>
              <br />
              <span>{state.message}</span>
            </Alert>
          )}
          <DataTableTitle
            title="Especialidades"
            action="Crear Especialidad"
            onClick={() => navigate(`/admin/specialties/save/`)}
          />
          <DataTable
            headers={["#", "Especialidad", "Temas", "Acciones"]}
            renderData={renderSpecialties}
            itemsCount={specialties.length}
            handleView={(id) => navigate(`/admin/topics/${id}`)}
            handleEdit={(id) => navigate(`/admin/specialties/save/${id}`)}
            handleDelete={(id) => {
              setItem(id);
              setShowRemove(true);
            }}
          />
          <RemoveElementModal
            showRemoveModal={showRemove}
            handleCloseRemoveModal={() => setShowRemove(false)}
            modalHeader="¿Está seguro que desea eliminar la especialidad?"
            modalBody="Todos los temas y tarjetas que pertenezcan a esta especialidad también serán eliminados"
            removeElement={deleteSpecialty}
          />
        </>
      )}
    </Container>
  );
};

export default AdminSpecialties;
