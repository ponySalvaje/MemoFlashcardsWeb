import { Row, Col } from "react-bootstrap";
import CardPlan from "../../components/card-plan/CardPlan";
import "./PlansSection.css";

function PlansSection() {
  const plansData = [
    {
      planName: "Plan Gratuito",
      price: 0,
      frequency: "Mensual",
      advantages: [
        "60 mazos desbloqueados",
        "Algoritmo de repetición espaciada",
      ],
    },
    {
      planName: "Plan Premium",
      price: 34.9,
      frequency: "Mensual",
      advantages: [
        "60 mazos desbloqueados",
        "Algoritmo de repetición espaciada",
        "Tarjetas de imágenes médicas",
        'Tarjetas "casos clínicos"',
        "Tarjetas de alto rendimiento EsSalud/ENAM/RM",
        'Tarjetas "perlas clínicas"',
      ],
    },
  ];

  return (
    <section id="plans">
      <div className="mt-4 mb-2 text-center section-title">
        <h3 className="mb-3">Elige el plan que necesitas</h3>
        <p className="section-description">
          A continuación te mostramos los planes que tenemos disponibles para
          ti.
        </p>
      </div>
      <Row className="justify-content-center pt-4">
        {plansData.map((plan, index) => (
          <Col key={index} xs={12} sm={6} md={6} lg={6}>
            <CardPlan {...plan} />
          </Col>
        ))}
      </Row>
    </section>
  );
}

export default PlansSection;
