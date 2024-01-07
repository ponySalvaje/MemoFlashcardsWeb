import React from "react";
import { Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";

const DataTableRowCount = ({ itemsPerPage, setItemsPerPage }) => {
  const handleSelect = (selectedValue) => {
    setItemsPerPage(selectedValue);
  };

  return (
    <Row>
      <Dropdown onSelect={handleSelect}>
        <Dropdown.Toggle variant="main" id="dropdown-basic">
          Mostrar {itemsPerPage} elementos
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item eventKey="10">10</Dropdown.Item>
          <Dropdown.Item eventKey="25">25</Dropdown.Item>
          <Dropdown.Item eventKey="50">50</Dropdown.Item>
          <Dropdown.Item eventKey="100">100</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Row>
  );
};

export default DataTableRowCount;
