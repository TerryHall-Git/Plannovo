import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../styles/Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Card({
  id,
  idx,
  parent,
  data,
  title,
  desc,
  isActive,
  previouslyActive,
  isOverlay,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: id,
      data: data,
      parent: parent,
      idx: idx,
    });

  const dndStyle = {
    zIndex: 1,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  let anim = previouslyActive ? " Card-drop" : "";
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
