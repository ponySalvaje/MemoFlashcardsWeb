import React from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const DataTableFilter = ({ setFilter }) => {
  return (
    <Form.Group controlId="formSearch">
      <div className="search-bar-group input-group mb-3 align-items-center">
        <FontAwesomeIcon className="search-icon" icon={faSearch} />
        <input
          type="text"
          className="form-control search-input"
          placeholder=""
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
    </Form.Group>
  );
};

export default DataTableFilter;
