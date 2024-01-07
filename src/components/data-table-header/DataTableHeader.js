import { Row, Col } from "react-bootstrap";
import DataTableFilter from "../data-table-filter/DataTableFilter";
import DataTableRowCount from "../data-table-row-count/DataTableRowCount";

const DataTableHeader = ({ itemsPerPage, setItemsPerPage, setFilter }) => {
  return (
    <Row>
      <Col>
        <DataTableRowCount
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </Col>
      <Col>
        <DataTableFilter setFilter={setFilter} />
      </Col>
    </Row>
  );
};

export default DataTableHeader;
