import "./SuspendedGroup.css";
import SuspendedCardItem from "../suspended-card-item/SuspendedCardItem";

const SuspendedGroup = ({ item, callback }) => {
  return (
    <div className="suspended-group">
      <div>
        <h4>
          <b>{item.subjectName}</b>
        </h4>
      </div>
      {item.suspendedCards.map((card) => {
        return (
          <SuspendedCardItem
            key={card.cardId}
            card={card}
            callback={callback}
          />
        );
      })}
    </div>
  );
};

export default SuspendedGroup;
