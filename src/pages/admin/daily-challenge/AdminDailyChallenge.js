import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Loading from "../../../components/loading/Loading";
import { getDailyChallenge } from "../../../api/admin.daily-challenge.api";
import AdminDailyChallengeForm from "./AdminDailyChallengeForm";

const AdminDailyChallenge = () => {
  const [dailyChallenge, setDailyChallenge] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDailyChallenge = async (id) => {
      try {
        const challengeData = (await getDailyChallenge()).data;
        setDailyChallenge(challengeData);
      } catch (error) {
        console.error("Error loading daily challenge:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDailyChallenge();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <AdminDailyChallengeForm
        question={dailyChallenge ? dailyChallenge.question : ""}
        answers={dailyChallenge ? dailyChallenge.options : []}
      />
    </Container>
  );
};

export default AdminDailyChallenge;
