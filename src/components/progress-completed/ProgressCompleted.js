import { useState, useEffect } from "react";
import { getProgress } from "../../api/progress.api";
import Loading from "../loading/Loading";
import ProgressItem from "../progress-item/ProgressItem";
import { useNavigate } from "react-router-dom";
import progressItemRoles from "../../common/constants/progressItemRoles";

const ProgressCompleted = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const goToTopic = (progressItem) => {
    navigate("/topics/" + progressItem.lessonId, {
      state: { specialtyName: progressItem.subjectName },
    });
  };

  const loadProgressCompleted = async () => {
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
    loadProgressCompleted();
  }, []);

  const completedProgress = progress.filter(
    (progressItem) => progressItem.percentageProgress === 100
  );

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        completedProgress.map((progressItem) => (
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

export default ProgressCompleted;
