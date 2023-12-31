import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Card from "./Card";
import "../styles/Container.css";
import CardAdd from "./CardAdd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Container({
  id,
  idx,
  parent,
  data,
  activeCard,
  title,
  refresh,
}) {
  const { setNodeRef: setDropRef } = useDroppable({
    id: id,
    data: data,
    parent: parent,
    idx: idx,
  });
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: data,
    parent: parent,
    idx: idx,
  });

  let cardsMarkup = data.cards.map((card) => (
    <Card
      key={card.id}
      id={card.id}
      title={card.title}
      desc={card.desc}
      isDragging={activeCard && activeCard.id === card.id ? true : false}
      data={card}
      isOverlay={false}
    />
  ));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  let styles = isDragging ? "Container Container-drag" : "Container";

  return (
    <div
      className={styles}
      {...attributes}
      ref={setDragRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <div>
        <div {...listeners} className="Container-header">
          <FontAwesomeIcon
            className="Container-grip"
            icon="fa-solid fa-grip-vertical"
          />
          <div>
            <p>{title}</p>
          </div>
          <FontAwesomeIcon
            className="Container-grip"
            icon="fa-solid fa-grip-vertical"
          />
        </div>
        <CardAdd containerIdx={idx} refresh={refresh} />
        <SortableContext
          items={data.cards.map((card) => card.id)}
          sensors={sensors}
          collisionDetection={closestCorners}
          strategy={verticalListSortingStrategy}
        >
          <div ref={setDropRef}>{cardsMarkup}</div>
        </SortableContext>
      </div>
    </div>
  );
}
