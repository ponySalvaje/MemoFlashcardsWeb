import { useState, useEffect } from "react";
import { getAdminTopics, removeAdminTopic } from "../../../api/admin.topic.api";
import { Container } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";
import EntityTable from "../../../components/entity-table/EntityTable";

const AdminTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState(location.state);
  const [item, setItem] = useState(0);

  useEffect(() => {
    navigate(".", { replace: true });
  }, [navigate]);

  const deleteTopic = async () => {
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
    handleDelete,
    filter
  ) => {
    let filteredTopics = topics;

    if (filter && filter.trim() !== "") {
      filteredTopics = topics.filter((topic) =>
        topic.title.toLowerCase().includes(filter.toLowerCase())
      );
    }

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTopics = filteredTopics.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

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
        <EntityTable
          state={state}
          title="Temas"
          goBackAction="Regresar"
          goBackClick={() => navigate(`/admin/specialties/`)}
          createAction="Crear Tema"
          createClick={() =>
            navigate(`/admin/topics/save/`, {
              state: { lessonId: id },
            })
          }
          headers={["#", "Tema", "Tarjetas", "Acciones"]}
          renderData={renderTopics}
          itemsCount={topics.length}
          itemList={topics}
          viewButton={(id) => navigate(`/admin/cards/${id}`)}
          editButton={(id) => navigate(`/admin/topics/save/${id}`)}
          deleteButton={deleteTopic}
          deleteHeader="¿Está seguro que desea eliminar el tema?"
          deleteMessage="Todas las tarjetas que pertenezcan a este tema también serán eliminadas"
          setItem={setItem}
        />
      )}
    </Container>
  );
};

export default AdminTopics;
