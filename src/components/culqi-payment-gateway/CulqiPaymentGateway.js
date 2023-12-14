import { Button } from "react-bootstrap";
import { CulqiProvider, Culqi } from "react-culqi";
import { upgradePremium } from "../../api/profile.api";
import { useNavigate } from "react-router-dom";

const CulqiPaymentGateway = ({ amount, months }) => {
  const culqiPublickKey = process.env.REACT_APP_CULQI_PUBLIC_KEY;

  const navigate = useNavigate();

  const goToCulqiResult = (result, message) => {
    navigate("/culqi-result", {
      state: { result: result, message: message },
    });
  };

  const upgradePlan = async (token, months) => {
    try {
      await upgradePremium(token, months);
      goToCulqiResult(true, "");
    } catch (ex) {
      goToCulqiResult(
        false,
        "Hubo un error al procesar el pago. Por favor, comúniquese con el área de soporte."
      );
    }
  };

  return (
    <CulqiProvider
      publicKey={culqiPublickKey}
      title="MemoFlashcards"
      currency="PEN"
      description="Suscripción MemoFlashcards"
      amount={amount * 100}
      options={{
        style: {
          logo: "https://www.memoflashcards.com/img/logo.svg",
          maincolor: "#3b2ebf",
          buttontext: "#ffffff",
          maintext: "#4A4A4A",
          desctext: "#4A4A4A",
        },
      }}
      onToken={async (token) => {
        await upgradePlan(token, months);
      }}
      onError={(error) => {
        goToCulqiResult(false, error.user_message);
      }}
    >
      <Culqi>
        {({ openCulqi }) => {
          return (
            <Button variant="main" className="btn my-1" onClick={openCulqi}>
              Adquirir plan
            </Button>
          );
        }}
      </Culqi>
    </CulqiProvider>
  );
};

export default CulqiPaymentGateway;
