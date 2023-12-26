import { useState, useEffect } from "react";
import { getAdminSpecialties } from "../../../api/admin.api";
import { Container, Pagination, Table } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";

const AdminSpecialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [maxPagesToShow] = useState(5);

  const loadSpecialties = async () => {
    try {
      const specialtiesData = (await getAdminSpecialties()).data;
      setSpecialties(specialtiesData);
      console.log("specialtiesData: ", specialtiesData);
    } catch (error) {
      console.error("Error loading specialties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpecialties();
  }, []);

  const totalPages = Math.ceil(specialties.length / itemsPerPage);

  const calculatePageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

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
        <td>Editar</td>
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
          <Pagination>
            <Pagination.First onClick={() => handlePaginationClick(1)} />
            <Pagination.Prev
              onClick={() => handlePaginationClick(page - 1)}
              disabled={page === 1}
            />

            {page > Math.floor(maxPagesToShow / 2) + 1 && (
              <Pagination.Ellipsis />
            )}

            {calculatePageNumbers().map((pageNumber) => (
              <Pagination.Item
                key={pageNumber}
                active={pageNumber === page}
                onClick={() => handlePaginationClick(pageNumber)}
              >
                {pageNumber}
              </Pagination.Item>
            ))}

            {page <= totalPages - Math.floor(maxPagesToShow / 2) && (
              <Pagination.Ellipsis />
            )}

            {totalPages > maxPagesToShow && (
              <Pagination.Item
                onClick={() => handlePaginationClick(totalPages)}
              >
                {totalPages}
              </Pagination.Item>
            )}

            <Pagination.Next
              onClick={() => handlePaginationClick(page + 1)}
              disabled={page === totalPages}
            />
            <Pagination.Last
              onClick={() => handlePaginationClick(totalPages)}
            />
          </Pagination>
        </>
      )}
    </Container>
  );
};

export default AdminSpecialties;
