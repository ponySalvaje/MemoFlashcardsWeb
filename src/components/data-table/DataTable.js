import { Table } from "react-bootstrap";
import Paginator from "../paginator/Paginator";
import { useState } from "react";

const DataTable = ({
  headers,
  renderData,
  itemsCount,
  handleView,
  handleEdit,
  handleDelete,
}) => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [maxPagesToShow] = useState(5);

  const handlePaginationClick = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            {headers.map((header) => {
              return <th key={header}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {renderData(page, itemsPerPage, handleView, handleEdit, handleDelete)}
        </tbody>
      </Table>
      <Paginator
        page={page}
        maxPagesToShow={maxPagesToShow}
        itemsCount={itemsCount}
        itemsPerPage={itemsPerPage}
        handlePaginationClick={handlePaginationClick}
      />
    </>
  );
};

export default DataTable;
