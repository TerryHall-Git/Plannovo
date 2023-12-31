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
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    transition,
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

  return (
    <div
      className="Container appearAnimation"
      {...attributes}
      ref={setDragRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <div ref={setNodeRef}>
        <div className="Container-header">
          <div>
            <p>{title}</p>
          </div>
          <button {...listeners}>
            <FontAwesomeIcon
              className="Container-grip"
              icon="fa-solid fa-grip-vertical"
            />
          </button>
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
    </div>
  );
}
