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
  const { projMgr } = useContext(ProjectContext);
  const { setNodeRef } = useDroppable({
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

  return (
    <div ref={setNodeRef} className="Container appearAnimation">
      <div className="Container-header">
        <div>
          <p>{title}</p>
        </div>
        <div>
          <FontAwesomeIcon
            className="Container-grip"
            icon="fa-solid fa-grip-vertical"
          />
        </div>
      </div>
      <CardAdd containerIdx={idx} refresh={refresh} />
      <SortableContext
        items={data.cards.map((card) => card.id)}
        sensors={sensors}
        collisionDetection={closestCorners}
        strategy={verticalListSortingStrategy}
      >
        {cardsMarkup}
      </SortableContext>
    </div>
  );
}
