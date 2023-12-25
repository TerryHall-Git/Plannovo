import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/ConfirmationBox.css";

export default function ConfirmationBox({ question, confirmCallback }) {
  return (
    <div className="ConfirmationBox">
      <div className="ConfirmationBox-question">
        <h3>{question}</h3>
      </div>
      <div className="ConfirmationBox-options">
        <div>
          <FontAwesomeIcon
            className="ConfirmationBox-option"
            icon="fa-solid fa-square-xmark"
            onClick={(e) => {
              e.stopPropagation();
              confirmCallback(false);
            }}
          />
        </div>
        <div></div>
        <div>
          <FontAwesomeIcon
            className="ConfirmationBox-option"
            icon="fa-solid fa-square-check"
            onClick={(e) => {
              e.stopPropagation();
              confirmCallback(true);
            }}
          />
        </div>
      </div>
    </div>
  );
}
