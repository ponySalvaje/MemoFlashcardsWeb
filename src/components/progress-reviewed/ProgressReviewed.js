import { useState } from "react";
import { useEffect } from "react";
import { getProgress } from "../../api/progress.api";
import Loading from "../loading/Loading";
import ProgressItem from "../progress-item/ProgressItem";

const ProgressReviewed = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSpecialties = async () => {
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
    loadSpecialties();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        progress.map((progress) => (
          <ProgressItem
            key={progress.subjectName}
            item={progress}
            onPress={progress}
          />
        ))
      )}
    </div>
  );
};

export default ProgressReviewed;
