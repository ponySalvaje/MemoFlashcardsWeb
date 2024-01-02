import { Row, Col } from "react-bootstrap";
import DataTableFilter from "../data-table-filter/DataTableFilter";

const DataTableHeader = ({ setFilter }) => {
  return (
    <Row>
      <Col></Col>
      <Col>
        <DataTableFilter setFilter={setFilter} />
      </Col>
    </Row>
  );
};

export default DataTableHeader;
