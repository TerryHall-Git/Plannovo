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
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
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
  const [activeContainer, setActiveContainer] = useState(null);
  const [containers, setContainers] = useState(projMgr.getActiveContainers());

  function refresh() {
    setContainers(projMgr.getActiveContainers());
  }

  function handleDragEnd() {
    setActiveCard(null);
    setActiveContainer(null);
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

  function swapContainerLocations(active, over) {
    if (active.id === over.id) return;

    let updatedContainers = [...containers];

    //clone container
    const clonedContainer = { ...updatedContainers[active.idx] };

    //delete container
    updatedContainers.splice(active.idx, 1);

    //insert cloned container position
    updatedContainers = [
      ...updatedContainers.slice(0, over.idx),
      clonedContainer,
      ...updatedContainers.slice(over.idx),
    ];

    //update index info
    updatedContainers.forEach((container, idx) => {
      container.idx = idx;
      container.cards.forEach((card) => (card.parentIdx = idx));
    });

    setContainers(updatedContainers);
  }

  function handleDragOver({ active, over }) {
    //Different container actions
    if (!over) {
      console.log("no over");
      return;
    }

    const overData = over.data.current;
    const activeData = active.data.current;

    if (activeData.type === "card") {
      if (activeData.parentIdx !== overData.parentIdx) {
        moveCards_DifferentContainer(activeData, overData);
      } else {
        moveCards_SameContainer(activeData, overData);
      }
    } else if (
      activeData.type === "container" &&
      overData.type === "container"
    ) {
      //dragging container
      console.log("move container");
      swapContainerLocations(activeData, overData);
    }
  }

  function handleDragStart({ active }) {
    if (active.data.current.type === "container") {
      setActiveContainer(active.data.current);
    } else {
      setActiveCard(active.data.current);
    }
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
        activeContainer={activeContainer}
        refresh={refresh}
        isOverlay={false}
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
          {activeContainer && (
            <DragOverlay adjustScale={false}>
              <Container
                key={activeContainer.id}
                id={activeContainer.id}
                idx={activeContainer.idx}
                title={activeContainer.title}
                parentIdx={activeContainer.idx}
                data={activeContainer}
                activeCard={null}
                activeContainer={null}
                refresh={refresh}
                isOverlay={true}
              />
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
