import { Table } from "react-bootstrap";
import Paginator from "../paginator/Paginator";
import { useEffect, useState } from "react";
import DataTableHeader from "../data-table-header/DataTableHeader";

const DataTable = ({
  headers,
  renderData,
  itemsCount,
  itemList,
  handleView,
  handleEdit,
  handleDelete,
}) => {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [maxPagesToShow] = useState(5);
  const [count, setCount] = useState(itemsCount);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setPage(1);
    setCount(
      itemList.filter((item) => {
        if (item.title) {
          // specialty, topics and cads filter
          return item.title.toLowerCase().includes(filter.toLowerCase());
        } else if (item.email) {
          // user filter
          return item.email.toLowerCase().includes(filter.toLowerCase());
        }
        return false;
      }).length
    );
  }, [filter]);

  const handlePaginationClick = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <DataTableHeader setFilter={setFilter} />
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            {headers.map((header) => {
              return <th key={header}>{header}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {renderData(
            page,
            itemsPerPage,
            handleView,
            handleEdit,
            handleDelete,
            filter
          )}
        </tbody>
      </Table>
      <Paginator
        page={page}
        maxPagesToShow={maxPagesToShow}
        count={count}
        itemsPerPage={itemsPerPage}
        handlePaginationClick={handlePaginationClick}
      />
    </>
  );
};

export default DataTable;
