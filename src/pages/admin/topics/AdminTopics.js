import { useState, useEffect } from "react";
import { getAdminTopics, removeAdminTopic } from "../../../api/admin.topic.api";
import { Alert, Container } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";
import DataTable from "../../../components/data-table/DataTable";
import DataTableTitle from "../../../components/data-table-title/DataTableTitle";
import RemoveElementModal from "../../../components/remove-element-modal/RemoveElementModal";

const AdminTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showRemove, setShowRemove] = useState(false);

  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState(location.state);
  const [item, setItem] = useState(0);

  useEffect(() => {
    navigate(".", { replace: true });
  }, [navigate]);

  const deleteTopic = async () => {
    setShowRemove(false);
    if (item) {
      try {
        await removeAdminTopic(item);
        await loadTopics(id);
        setState({
          result: true,
          message: "¡Tema eliminado exitosamente!",
        });
      } catch (error) {
        setState({
          result: false,
          message:
            "Hubo un error inesperado al eliminar el tema. Por favor, inténtelo más tarde.",
        });
      }
    }
  };

  const loadTopics = async (id) => {
    setLoading(true);
    try {
      const topicsData = (await getAdminTopics(id)).data;
      setTopics(topicsData);
    } catch (error) {
      console.error("Error loading topics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTopics(id);
  }, [id]);

  const renderTopics = (
    page,
    itemsPerPage,
    handleView,
    handleEdit,
    handleDelete
  ) => {
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTopics = topics.slice(indexOfFirstItem, indexOfLastItem);

    return currentTopics.map((topic) => (
      <tr key={topic.id}>
        <td>{topic.id}</td>
        <td>{topic.title}</td>
        <td>{topic.cardsCount}</td>
        <td>
          <TableActionButtons
            itemId={topic.id}
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
            title="Temas"
            action="Crear Tema"
            onClick={() =>
              navigate(`/admin/topics/save/`, { state: { lessonId: id } })
            }
          />
          <DataTable
            headers={["#", "Tema", "Tarjetas", "Acciones"]}
            renderData={renderTopics}
            itemsCount={topics.length}
            handleView={(id) => navigate(`/admin/cards/${id}`)}
            handleEdit={(id) => navigate(`/admin/topics/save/${id}`)}
            handleDelete={(id) => {
              setItem(id);
              setShowRemove(true);
            }}
          />
          <RemoveElementModal
            showRemoveModal={showRemove}
            handleCloseRemoveModal={() => setShowRemove(false)}
            modalHeader="¿Está seguro que desea eliminar el tema?"
            modalBody="Todas las tarjetas que pertenezcan a este tema también serán eliminadas"
            removeElement={deleteTopic}
          />
        </>
      )}
    </Container>
  );
};

export default AdminTopics;
