import { Alert } from "react-bootstrap";
import DataTableTitle from "../data-table-title/DataTableTitle";
import DataTable from "../data-table/DataTable";
import RemoveElementModal from "../remove-element-modal/RemoveElementModal";
import { useState } from "react";

const EntityTable = ({
  state,
  title,
  goBackAction,
  goBackClick,
  createAction,
  createClick,
  headers,
  renderData,
  itemsCount,
  itemList,
  cardsButton,
  viewButton,
  editButton,
  deleteButton,
  deleteHeader,
  deleteMessage,
  setItem,
}) => {
  const [showRemove, setShowRemove] = useState(false);

  return (
    <>
      {state && (
        <Alert variant={state.result ? "primary" : "danger"} dismissible>
          <b>
            {state.result
              ? "Operación completada con éxito"
              : "¡Ups! Algo salió mal."}
          </b>
          <br />
          <span>{state.message}</span>
        </Alert>
      )}
      <DataTableTitle
        title={title}
        goBackAction={goBackAction}
        goBackClick={goBackClick}
        createAction={createAction}
        createClick={createClick}
      />
      <DataTable
        headers={headers}
        renderData={renderData}
        itemsCount={itemsCount}
        itemList={itemList}
        handleCards={cardsButton}
        handleView={viewButton}
        handleEdit={editButton}
        handleDelete={(id) => {
          setItem(id);
          setShowRemove(true);
        }}
      />
      <RemoveElementModal
        showRemoveModal={showRemove}
        handleCloseRemoveModal={() => setShowRemove(false)}
        modalHeader={deleteHeader}
        modalBody={deleteMessage}
        removeElement={() => {
          setShowRemove(false);
          deleteButton();
        }}
      />
    </>
  );
};

export default EntityTable;
