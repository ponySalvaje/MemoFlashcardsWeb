import { useState, useEffect } from "react";
import { getAdminTopics } from "../../../api/admin.api";
import { Container, Table } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import Paginator from "../../../components/paginator/Paginator";
import { useNavigate, useParams } from "react-router-dom";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";

const AdminTopics = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [maxPagesToShow] = useState(5);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin/cards/${id}`);
  };

  const handleEdit = (id) => {
    console.log("handle edit: ", id);
  };

  const handleDelete = (id) => {
    console.log("handle delete: ", id);
  };

  useEffect(() => {
    const loadTopics = async (id) => {
      try {
        const topicsData = (await getAdminTopics(id)).data;
        setTopics(topicsData);
        console.log("topicsData: ", topicsData);
      } catch (error) {
        console.error("Error loading topics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTopics(id);
  }, [id]);

  const renderTopics = () => {
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

  const handlePaginationClick = (newPage) => {
    setPage(newPage);
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Especialidad</th>
                <th>Tarjetas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{renderTopics()}</tbody>
          </Table>
          <Paginator
            page={page}
            maxPagesToShow={maxPagesToShow}
            itemsCount={topics.length}
            itemsPerPage={itemsPerPage}
            handlePaginationClick={handlePaginationClick}
          />
        </>
      )}
    </Container>
  );
};

export default AdminTopics;
