import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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

  let { title, isDragging, classStyle } = props;

  if (isDragging) classStyle = "KanbanCardOutline";

  return (
    <div ref={setNodeRef} style={dndStyle} {...attributes} {...listeners}>
      <div className={classStyle}>
        <div className="wrapper">
          {isDragging ? (
            <div className="title"></div>
          ) : (
            <div className="title">
              <h3>{title}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
