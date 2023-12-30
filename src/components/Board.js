import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCorners,
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useContext, useState } from "react";
import { ProjectContext } from "../App";
import Container from "./Container";
import Card from "./Card";
import ContainerAdd from "./ContainerAdd";

import "../styles/Board.css";

export default function Board() {
  const { activeBoard, projMgr } = useContext(ProjectContext);
  const [activeCard, setActiveCard] = useState(null);
  const [containers, setContainers] = useState(projMgr.getActiveContainers());

  function refresh() {
    setContainers(projMgr.getActiveContainers());
  }

  function handleDragEnd() {
    setActiveCard(null);
  }

  function moveCards_SameContainer(active, over) {
    const overCardIdx = over.idx;
    const activeCardIdx = active.idx;
    const updatedContainers = [...containers];
    const clonedCard = {
      ...updatedContainers[active.parentIdx].cards[activeCardIdx],
    };
    updatedContainers[active.parentIdx].cards.splice(activeCardIdx, 1);
    updatedContainers[over.parentIdx].cards = [
      ...updatedContainers[over.parentIdx].cards.slice(0, overCardIdx),
      clonedCard,
      ...updatedContainers[over.parentIdx].cards.slice(overCardIdx),
    ];
    clonedCard.idx = overCardIdx;

    //update index info
    activeCard.parentIdx = updatedContainers[over.parentIdx].idx;
    updatedContainers[active.parentIdx].cards.forEach(
      (card, idx) => (card.idx = idx)
    );

    setContainers(updatedContainers);
  }

  function moveCards_DifferentContainer(active, over) {
    let overContainerIdx =
      over.type === "container" ? over.idx : over.parentIdx;
    let overCardIdx = over.type === "card" ? over.idx : -1;
    const updatedContainers = [...containers];
    const clonedCard = {
      ...updatedContainers[active.parentIdx].cards[active.idx],
    };
    updatedContainers[active.parentIdx].cards.splice(active.idx, 1);
    if (
      overCardIdx >= 0 &&
      overCardIdx < updatedContainers[overContainerIdx].cards.length - 1
    ) {
      updatedContainers[overContainerIdx].cards = [
        ...updatedContainers[overContainerIdx].cards.slice(0, overCardIdx),
        clonedCard,
        ...updatedContainers[overContainerIdx].cards.slice(overCardIdx),
      ];
      clonedCard.idx = overCardIdx;
    } else {
      clonedCard.idx =
        updatedContainers[overContainerIdx].cards.push(clonedCard) - 1;
    }

    //update index info
    clonedCard.parentIdx = updatedContainers[overContainerIdx].idx;
    updatedContainers[active.parentIdx].cards.forEach(
      (card, idx) => (card.idx = idx)
    );

    setContainers(updatedContainers);
  }

  function handleDragOver({ active, over }) {
    if (active.data.current.type === "container") return;

    //Different container actions
    if (!over) {
      console.log("no over");
      return;
    }

    over = over.data.current;
    active = active.data.current;

    if (over.type === "card" && active.parentIdx === over.parentIdx) {
      moveCards_SameContainer(active, over);
    } else {
      moveCards_DifferentContainer(active, over);
    }
  }

  function handleDragStart({ active }) {
    console.log(active);
    if (active.data.current.type === "container") return;

    setActiveCard(active.data.current);
  }

  const containerMarkup = containers.map((container, idx) => {
    return (
      <Container
        key={container.id}
        id={container.id}
        idx={idx}
        title={container.title}
        parentIdx={idx}
        data={container}
        activeCard={activeCard}
        refresh={refresh}
      />
    );
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="Board">
      <div className="Board-grid">
        <DndContext
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
        >
          <SortableContext
            items={containers.map((container) => container.id)}
            sensors={sensors}
            collisionDetection={closestCorners}
            strategy={horizontalListSortingStrategy}
          >
            {containerMarkup}
          </SortableContext>
          {activeCard && (
            <DragOverlay adjustScale={false}>
              <Card title={activeCard.title} isOverlay={true} />
            </DragOverlay>
          )}
        </DndContext>
        {activeBoard !== undefined ? (
          <ContainerAdd refresh={refresh} />
        ) : (
          <div className="Board-warning">
            <p>No active board. Click on "Boards" to activate one.</p>
          </div>
        )}
      </div>
    </div>
  );
}
