import { useState, useEffect } from "react";
import { getProgress } from "../../api/progress.api";
import Loading from "../loading/Loading";
import ProgressItem from "../progress-item/ProgressItem";
import { useNavigate } from "react-router-dom";
import progressItemRoles from "../../common/constants/progressItemRoles";

const ProgressReviewed = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const goToTopic = (progressItem) => {
    navigate("/topics/" + progressItem.lessonId, {
      state: { specialtyName: progressItem.subjectName },
    });
  };

  const loadProgressReviewed = async () => {
    try {
      const progressData = (await getProgress()).data;
      setProgress(progressData);
    } catch (error) {
      console.error("Error loading progress:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgressReviewed();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        progress.map((progressItem) => (
          <ProgressItem
            key={progressItem.subjectName}
            item={progressItem}
            role={progressItemRoles.reviewed}
            onClick={() => goToTopic(progressItem)}
          />
        ))
      )}
    </div>
  );
};

export default ProgressReviewed;
