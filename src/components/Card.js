import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Card.css";

/**
 * This component creates a card, which is used for the kanban-style containers
 */
export default function Card({
  id,
  idx,
  parent,
  data,
  title,
  desc,
  activeCard,
  lastActiveCard,
  isOverlay,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      data: data,
      parent: parent,
      idx: idx,
    });

  let isActive = activeCard && activeCard.id === id ? true : false;
  let prevActive = lastActiveCard && lastActiveCard.id === id ? true : false;

  //dynamic styling
  const dndStyle = {
    zIndex: 1,
    transform: CSS.Transform.toString(transform),
    transition,
  };
  let anim = prevActive ? " Card-drop" : "";
  let cardStyle = isActive ? "Card-inset" : "Card-idle" + anim;
  cardStyle = isOverlay ? "Card-drag" : cardStyle;

  return (
    <div ref={setNodeRef} style={dndStyle} {...attributes} {...listeners}>
      <div className={cardStyle}>
        <div>
          {isActive ? (
            <div></div>
          ) : (
            <div className="Card-info">
              <div className="Card-header">
                <h3>{title}</h3>
                <button className="Card-edit">
                  <FontAwesomeIcon icon="fa-solid fa-pen-to-square" />
                </button>
              </div>
              <div className="Card-body">
                <p>{desc}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
