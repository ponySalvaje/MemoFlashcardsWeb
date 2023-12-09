import { useLocation } from "react-router-dom";

const CulqiResult = () => {
  const location = useLocation();
  const result = location.state && location.state.result;
  const message = location.state && location.state.message;
  return (
    <div>
      {result} {message}
    </div>
  );
};

export default CulqiResult;
