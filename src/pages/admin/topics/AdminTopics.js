import { useState, useEffect } from "react";
import { getAdminTopics } from "../../../api/admin.topic.api";
import { Container } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";
import DataTable from "../../../components/data-table/DataTable";
import DataTableTitle from "../../../components/data-table-title/DataTableTitle";

const AdminTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin/cards/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/admin/topics/save/${id}`);
  };

  const handleDelete = (id) => {
    console.log("handle delete: ", id);
  };

  const handleCreateTopic = () => {
    navigate(`/admin/topics/save/`);
  };

  useEffect(() => {
    const loadTopics = async (id) => {
      try {
        const topicsData = (await getAdminTopics(id)).data;
        setTopics(topicsData);
      } catch (error) {
        console.error("Error loading topics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTopics(id);
  }, [id]);

  const topicsHeaders = ["#", "Tema", "Tarjetas", "Acciones"];

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
          <DataTableTitle
            title="Temas"
            action="Crear Tema"
            onClick={handleCreateTopic}
          />
          <DataTable
            headers={topicsHeaders}
            renderData={renderTopics}
            itemsCount={topics.length}
            handleView={handleView}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
    </Container>
  );
};

export default AdminTopics;
