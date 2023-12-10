import "./PlansSection.css";
import Plans from "../../components/plans/Plans";
import { plans } from "../../common/constants/plans";

function PlansSection() {
  return (
    <section id="plans">
      <div className="mt-4 mb-2 text-center section-title">
        <h3 className="mb-3">Elige el plan que necesites</h3>
        <p className="section-description">
          A continuación te mostramos los planes que tenemos disponibles para
          ti.
        </p>
      </div>
      <Plans plans={plans} message={"Comenzar ahora"} />
    </section>
  );
}

export default PlansSection;
