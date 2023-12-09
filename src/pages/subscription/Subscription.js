import { useParams } from "react-router-dom";
import { plans } from "../../common/constants/plans";
import CardPlan from "../../components/card-plan/CardPlan";
import "./Subscription.css";
import { useState } from "react";

const Subscription = () => {
  const { id } = useParams();
  const filteredPlan = plans.filter((p) => p.id == id)[0];

  const [selectedPlan, setSelectedPlan] = useState(filteredPlan);

  console.log("filteredPlan: ", filteredPlan);

  return (
    <section id="subscription">
      <div className="mt-4 mb-2 text-center section-title">
        <h3 className="mb-3">Completa tu subscripción</h3>
        {selectedPlan && (
          <p className="section-description">
            Estás adquiriendo el <b>{selectedPlan.planName}</b>
          </p>
        )}
      </div>
      <div>{selectedPlan && <CardPlan {...selectedPlan} payment={true} />}</div>
    </section>
  );
};

export default Subscription;
