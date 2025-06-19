import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TableActionButtons from "../../../components/table-action-buttons/TableActionButtons";
import EntityTable from "../../../components/entity-table/EntityTable";
import { getAdminNews, removeAdminNews } from "../../../api/admin.news.api";
import { formatDateTime } from "../../../common/utils/dateFormat";

const AdminNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [state, setState] = useState(location.state);
  const [item, setItem] = useState(0);

  useEffect(() => {
    navigate(".", { replace: true });
  }, [navigate]);

  const deleteNews = async () => {
    if (item) {
      try {
        await removeAdminNews(item);
        await loadNews(id);
        setState({
          result: true,
          message: "¡Tema eliminado exitosamente!",
        });
      } catch (error) {
        setState({
          result: false,
          message:
            "Hubo un error inesperado al eliminar el tema. Por favor, inténtelo más tarde.",
        });
      }
    }
  };

  const loadNews = async () => {
    setLoading(true);
    try {
      const newsData = (await getAdminNews()).data;
      setNews(newsData);
    } catch (error) {
      console.error("Error loading news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNews(id);
  }, [id]);

  const renderNews = (
    page,
    itemsPerPage,
    handleView = () => {},
    handleEdit,
    handleDelete,
    filter
  ) => {
    let filteredNews = news;

    if (filter && filter.trim() !== "") {
      filteredNews = news.filter((news) =>
        news.title.toLowerCase().includes(filter.toLowerCase())
      );
    }

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNews = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

    return currentNews.map((news) => (
      <tr key={news.id}>
        <td>{news.id}</td>
        <td>{news.title}</td>
        <td>{news.author}</td>
        <td>{formatDateTime(news.createdAt)}</td>
        <td>
          <TableActionButtons
            itemId={news.id}
            showView={false}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
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
          title="Noticias"
          createAction="Crear Noticia"
          createClick={() =>
            navigate(`/admin/news/save/`, {
              state: { lessonId: id },
            })
          }
          headers={["#", "Título", "Autor", "Creado el", "Acciones"]}
          renderData={renderNews}
          itemsCount={news.length}
          itemList={news}
          editButton={(id) => navigate(`/admin/news/save/${id}`)}
          deleteButton={deleteNews}
          deleteHeader="¿Está seguro que desea eliminar la noticia?"
          deleteMessage="Esta acción ya no se puede deshacer"
          setItem={setItem}
        />
      )}
    </Container>
  );
};

export default AdminNews;
