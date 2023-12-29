import { useState, useEffect } from "react";
import { getAdminSpecialties } from "../../../api/admin.specialty.api";
import { Container, Table } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import Paginator from "../../../components/paginator/Paginator";
import { useNavigate } from "react-router-dom";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";

const AdminSpecialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [maxPagesToShow] = useState(5);

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

  const renderSpecialties = () => {
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
                <th>Temas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{renderSpecialties()}</tbody>
          </Table>
          <Paginator
            page={page}
            maxPagesToShow={maxPagesToShow}
            itemsCount={specialties.length}
            itemsPerPage={itemsPerPage}
            handlePaginationClick={handlePaginationClick}
          />
        </>
      )}
    </Container>
  );
};

export default AdminSpecialties;
