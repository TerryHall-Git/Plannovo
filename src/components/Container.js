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
import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../App";

export default function Container({
  id,
  idx,
  parent,
  data,
  activeCard,
  title,
  refresh,
  cards,
}) {
  const { projMgr } = useContext(ProjectContext);
  const { setNodeRef } = useDroppable({
    id: id,
    data: data,
    parent: parent,
    idx: idx,
  });
  // const [cards, setCards] = useState(data.cards);
  // const { data, activeCard, title, refresh } = props;

  // useEffect(() => {
  //   setCards(data.cards);
  // }, [data.cards]);

  // let cards = data.cards;

  let cardsMarkup = cards.map((card) => (
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

  return (
    <div ref={setNodeRef} className="Container">
      <p>{title}</p>
      <CardAdd containerIdx={idx} refresh={refresh} />
      <SortableContext
        items={cards.map((card) => card.id)}
        sensors={sensors}
        collisionDetection={closestCorners}
        strategy={verticalListSortingStrategy}
      >
        {cardsMarkup}
      </SortableContext>
    </div>
  );
}
