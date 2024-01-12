import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
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
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";
import CardAdd from "./CardAdd";
import "../styles/Container.css";

export default function Container({
  id,
  idx,
  parent,
  data,
  activeCard,
  lastActiveCard,
  activeContainer,
  title,
  refresh,
  isOverlay,
  dragStatus,
  interacted,
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

  let isActive = activeContainer && activeContainer.id === id ? true : false;

  let cardsMarkup = data.cards.map((card) => (
    <Card
      key={card.id}
      id={card.id}
      title={card.title}
      desc={card.desc}
      activeCard={activeCard}
      lastActiveCard={lastActiveCard}
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

  //dynamic styling
  let anim = !interacted.current ? " appearAnimation" : "";
  let styles =
    dragStatus.draggingContainer && isOverlay
      ? "Container Container-drag"
      : "Container" + anim;

  return (
    <div
      {...attributes}
      ref={setDragRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      {isActive ? (
        <div className="Container-inset"></div>
      ) : (
        <div className={styles}>
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
            <div className="Container-cards" ref={setDropRef}>
              {cardsMarkup}
            </div>
          </SortableContext>
        </div>
      )}
    </div>
  );
}
