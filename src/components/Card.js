import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../styles/Card.css";

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
        <div className="wrapper">
          {isActive ? (
            <div className="title"></div>
          ) : (
            <div className="title">
              <h3>{title}</h3>
              <p>{desc}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
