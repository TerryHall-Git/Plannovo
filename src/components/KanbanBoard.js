import React, { useState, useEffect } from "react";
import KanbanContainer from "./KanbanContainer";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";
import "../styles/KanbanBoard.css";

const KanbanBoard = () => {
  const [containers, setContainers] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    fetch("./containerData.json")
      .then((res) => res.json())
      .then((data) => {
        setContainers(data.containers);
      });
  }, []);

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
    setActiveCard(active.data.current);
  }

  const containerMarkup = containers.map((container, idx) => {
    return (
      <KanbanContainer
        key={container.name}
        id={container.name}
        parentIdx={idx}
        data={container}
        activeCard={activeCard}
      />
    );
  });

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          height: "100vh",
        }}
      >
        {containerMarkup}
      </div>
      {activeCard && (
        <DragOverlay adjustScale={false}>
          <KanbanCard
            title={activeCard.title}
            classStyle="KanbanCardDragging"
          />
        </DragOverlay>
      )}
    </DndContext>
  );
};
export default KanbanBoard;
