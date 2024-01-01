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
import { useEffect, useState } from "react";

export default function Container({
  id,
  idx,
  parent,
  data,
  activeCard,
  activeContainer,
  title,
  refresh,
  isOverlay,
  showAppearAnim,
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

  let anim = showAppearAnim ? " appearAnimation" : "";
  let styles = isDragging ? "Container Container-drag" : "Container" + anim;

  let makeShadow = activeContainer && activeContainer.id === id;

  return (
    <div
      {...attributes}
      ref={setDragRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      {makeShadow ? (
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
