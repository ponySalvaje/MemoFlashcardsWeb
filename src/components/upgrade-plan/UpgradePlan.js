import { plans } from "../../common/constants/plans";
import Plans from "../plans/Plans";
import "./UpgradePlan.css";

const UpgradePlan = () => {
  return (
    <section id="upgrade-plan">
      <div className="mt-4 mb-2 text-center section-title">
        <h3 className="mb-3">¡Finalizaste tus tarjetas gratuitas!</h3>
        <p className="section-description">
          Pasa al Plan Premium para poder <br /> seguir estudiando y dominar
          este tema
        </p>
      </div>
      <div>
        <Plans plans={plans.filter((p) => p.id !== 1)} />
      </div>
    </section>
  );
};

export default UpgradePlan;
