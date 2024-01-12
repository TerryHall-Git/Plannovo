import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmationBox from "./ConfirmationBox";
import { useState } from "react";
import "../styles/Animation.css";
import "../styles/Tile.css";

/**
 * This component is used to display a tile - used on the projects & boards pages
 */
export default function Tile({
  isActive,
  title,
  desc,
  tileDeleted,
  tileActivated,
  tileCallbackData,
}) {
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  function confirmCallback(confirm) {
    tileCallbackData["confirmDelete"] = confirm;
    setShowConfirmBox(false);
    tileDeleted(tileCallbackData);
  }

  let borderStyle = isActive ? "Tile-active" : "Tile-inactive";

  return (
    <div
      className={`Tile ${borderStyle} appearAnimation enlargeOnHover`}
      onClick={() => tileActivated(tileCallbackData)}
    >
      <div className="Tile-header">
        <div>
          <p>{title}</p>
        </div>
        <button>
          <FontAwesomeIcon
            className="Tile-trashIcon"
            icon="fa-solid fa-trash-can"
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirmBox(true);
            }}
          />
        </button>
      </div>
      {showConfirmBox ? (
        <ConfirmationBox
          question="Are you sure?"
          confirmCallback={confirmCallback}
        />
      ) : (
        <div>
          <p>{desc}</p>
        </div>
      )}
    </div>
  );
}
