import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EntityTable from "../../../components/entity-table/EntityTable";
import { formatDateTime } from "../../../common/utils/dateFormat";
import {
  getAdminSuggestions,
  readAdminSuggestion,
} from "../../../api/admin.suggestion.api";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";

const AdminSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState(location.state);
  const [item, setItem] = useState(0);

  useEffect(() => {
    navigate(".", { replace: true });
  }, [navigate]);

  const checkSuggestion = async () => {
    if (item) {
      try {
        await readAdminSuggestion(item);
        await loadSuggestions(id);
      } catch (error) {
        setState({
          result: false,
          message:
            "Hubo un error inesperado al leer la sugerencia. Por favor, inténtelo más tarde.",
        });
      }
    }
  };

  const loadSuggestions = async () => {
    setLoading(true);
    try {
      const suggestionsData = (await getAdminSuggestions()).data;
      setSuggestions(suggestionsData);
    } catch (error) {
      console.error("Error loading suggestions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions(id);
  }, [id]);

  const renderSuggestions = (
    page,
    itemsPerPage,
    handleView = () => {},
    handleEdit,
    handleDelete,
    filter,
    handleCards,
    handleCheck
  ) => {
    let filteredSuggestions = suggestions;

    if (filter && filter.trim() !== "") {
      filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.message.toLowerCase().includes(filter.toLowerCase())
      );
    }

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSuggestions = filteredSuggestions.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return currentSuggestions.map((suggestion) => (
      <tr
        key={suggestion.id}
        className={`${
          suggestion.isRead ? "row-message-read" : "row-message-unread"
        }`}
      >
        <td>{suggestion.id}</td>
        <td>{suggestion.user}</td>
        <td>{suggestion.email}</td>
        <td>{suggestion.message}</td>
        <td>{formatDateTime(suggestion.createdAt)}</td>
        <td>
          {!suggestion.isRead && (
            <TableActionButtons
              itemId={suggestion.id}
              showView={false}
              handleCheck={handleCheck}
            />
          )}
        </td>
      </tr>
    ));
  };

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <EntityTable
          state={state}
          title="Sugerencias"
          headers={[
            "#",
            "Usuario",
            "Correo",
            "Mensaje",
            "Creado el",
            "Acciones",
          ]}
          renderData={renderSuggestions}
          itemsCount={suggestions.length}
          itemList={suggestions}
          deleteButton={checkSuggestion}
          deleteHeader="¿Está seguro que desea marcar la sugerencia como leída?"
          deleteMessage="Se considerará la sugerencia leída"
          deleteBtnLabel="Marcar leída"
          setItem={setItem}
        />
      )}
    </Container>
  );
};

export default AdminSuggestions;
