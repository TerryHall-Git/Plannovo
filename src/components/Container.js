import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Card from "./Card";
import "../styles/Container.css";
import CardAdd from "./CardAdd";

export default function Container(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
    data: props.data,
    parent: props.parent,
    idx: props.idx,
  });
  const { data, activeCard, title } = props;

  let cards = data.cards;
  let cardsMarkup = cards.map((card) => (
    <Card
      key={card.name}
      id={card.name}
      title={card.title}
      isDragging={activeCard && activeCard.name === card.name ? true : false}
      data={card}
    />
  ));

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div ref={setNodeRef} className="Container">
      <p>{title}</p>
      <CardAdd containerId={props.idx} />
      <SortableContext
        items={cards.map((card) => card.name)}
        sensors={sensors}
        collisionDetection={closestCorners}
        strategy={verticalListSortingStrategy}
      >
        {cardsMarkup}
      </SortableContext>
    </div>
  );
}
