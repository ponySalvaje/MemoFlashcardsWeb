import { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import ProgressItem from "../progress-item/ProgressItem";
import { useNavigate } from "react-router-dom";
import { getSuspendedCards } from "../../api/progress.api";
import progressItemRoles from "../../common/constants/progressItemRoles";

const ProgressSuspended = () => {
  const [suspended, setSuspended] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const goToSuspended = (progressItem) => {
    navigate("/suspended/" + progressItem.lessonId, {
      state: { specialtyName: progressItem.subjectName },
    });
  };

  const loadProgressSuspended = async () => {
    try {
      const suspendedData = (await getSuspendedCards()).data;
      setSuspended(suspendedData);
    } catch (error) {
      console.error("Error loading suspended cards:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgressSuspended();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        suspended.map((suspendedItem) => (
          <ProgressItem
            key={suspendedItem.subjectName}
            item={suspendedItem}
            role={progressItemRoles.suspended}
            onClick={() => goToSuspended(suspendedItem)}
          />
        ))
      )}
    </div>
  );
};

export default ProgressSuspended;
