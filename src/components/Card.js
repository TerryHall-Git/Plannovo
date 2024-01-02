import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import "../styles/Card.css";

export default function Card(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      data: props.data,
      parent: props.parent,
      idx: props.idx,
    });

  const dndStyle = {
    zIndex: 1,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const { title, desc, isDragging, isOverlay, dragStatus } = props;

  let anim = dragStatus && !dragStatus.draggingContainer ? " Card-drop" : "";
  let cardStyle = isDragging ? "Card-inset" : "Card-idle" + anim;
  cardStyle = isOverlay ? "Card-drag" : cardStyle;

  return (
    <div ref={setNodeRef} style={dndStyle} {...attributes} {...listeners}>
      <div className={cardStyle}>
        <div className="wrapper">
          {isDragging ? (
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
