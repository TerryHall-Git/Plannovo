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
import { useContext, useEffect, useRef, useState } from "react";
import { ProjectContext } from "../App";
import Container from "./Container";
import Card from "./Card";
import ContainerAdd from "./ContainerAdd";

import "../styles/Board.css";
import CardForm from "./CardForm";

export default function Board() {
  const types = { CONTAINER: "container", CARD: "card" };
  const { activeBoard, projMgr } = useContext(ProjectContext);
  const [activeCard, setActiveCard] = useState(null);
  const [lastActiveCard, setLastActiveCard] = useState(null);
  const [activeContainer, setActiveContainer] = useState(null);
  const [containers, setContainers] = useState(projMgr.getActiveContainers());
  const [dragStatus, setDragStatus] = useState({
    draggingContainer: false,
    draggingCard: false,
  });
  const [dragged, setDragged] = useState(false);
  const interacted = useRef(false);
  const [showCardForm, setShowCardForm] = useState(false);
  // const [cardFormData, setCardFormData] = useState(null);

  function refresh() {
    setContainers(projMgr.getActiveContainers());
    console.log("refresh");
  }

  function save() {
    projMgr.setActiveContainers(containers);
    console.log("save");
  }

  function handleDragEnd() {
    setLastActiveCard({ ...activeCard });
    setActiveCard(null);
    setActiveContainer(null);
    setDragged(false);
    setDragStatus({ draggingContainer: false, draggingCard: false });
    if (containers !== undefined) save();

    //if !dragged, then card clicked (onKeyUp)
    if (!dragged) {
      setShowCardForm(true);
    }

    console.log("handleDragEnd");
  }

  function moveCards_SameContainer(active, over) {
    if (active.id === over.id) return;

    const updatedContainers = [...containers];
    const activeContainer = updatedContainers[active.parentIdx];

    //remove @active-index & get element
    const draggedCard = activeContainer.cards.splice(active.idx, 1)[0];

    //insert draggedCard @over-index
    activeContainer.cards.splice(over.idx, 0, draggedCard);

    //update card idx
    draggedCard.idx = over.idx;

    //update index info
    draggedCard.parentIdx = activeContainer.idx;
    activeContainer.cards.forEach((card, idx) => (card.idx = idx));

    setContainers(updatedContainers);
  }

  function moveCards_DifferentContainer(active, over) {
    if (active.id === over.id) return;

    const overContainerIdx =
      over.type === types.CONTAINER ? over.idx : over.parentIdx;
    const updatedContainers = [...containers];
    const activeContainer = updatedContainers[active.parentIdx];
    const overContainer = updatedContainers[overContainerIdx];

    //remove @active-index & get element
    const draggedCard = activeContainer.cards.splice(active.idx, 1)[0];

    if (
      overContainer.cards.length &&
      over.idx < overContainer.cards.length &&
      over.type === types.CARD
    ) {
      //insert draggedCard @over-index
      overContainer.cards.splice(over.idx, 0, draggedCard);

      //update card idx
      draggedCard.idx = over.idx;
    } else {
      //dragging over container or last card

      //add card to end and update card idx
      draggedCard.idx = overContainer.cards.push(draggedCard) - 1;
    }

    //update index info
    draggedCard.parentIdx = overContainer.idx;
    activeContainer.cards.forEach((card, idx) => (card.idx = idx));
    overContainer.cards.forEach((card, idx) => (card.idx = idx));

    setContainers(updatedContainers);
  }

  function swapContainerLocations(active, over) {
    if (active.id === over.id) return;

    let updatedContainers = [...containers];

    //remove @active-index & get element
    const draggedContainer = updatedContainers.splice(active.idx, 1)[0];

    //insert draggedContainer @over-index
    updatedContainers.splice(over.idx, 0, draggedContainer);

    //update index info (only update those that need it)
    const lowestIndex = over.idx < active.idx ? over.idx : active.idx;
    for (let i = lowestIndex; i < updatedContainers.length; i++) {
      let container = updatedContainers[i];
      container.idx = i;
      container.cards.forEach((card) => (card.parentIdx = i));
    }
    setContainers(updatedContainers);
  }

  function handleDragOver({ active, over }) {
    if (!over) return;

    const overData = over.data.current;
    const activeData = active.data.current;

    if (activeData.type === types.CARD) {
      if (activeData.parentIdx !== overData.parentIdx) {
        moveCards_DifferentContainer(activeData, overData);
      } else {
        moveCards_SameContainer(activeData, overData);
      }
    } else if (
      activeData.type === types.CONTAINER &&
      overData.type === types.CONTAINER
    ) {
      //dragging container
      swapContainerLocations(activeData, overData);
    }
    console.log("handleDragOver");
  }

  // function handleDragStart({ active }) {
  //   console.log(dragged);
  //   if (!dragged) return;
  //   if (active.data.current.type === types.CONTAINER) {
  //     setActiveContainer(active.data.current);
  //     setDragStatus({ draggingContainer: true, draggingCard: false });
  //   } else {
  //     setActiveCard(active.data.current);
  //     setDragStatus({ draggingContainer: false, draggingCard: true });
  //   }
  //   if (!interacted.current) interacted.current = true;
  // }

  function handleDragStart({ active }) {
    if (active.data.current.type === types.CARD) {
      setActiveCard(active.data.current);
    }
    console.log("handleDragStart");
  }

  function handleDragMove({ active }) {
    if (!dragged) {
      if (active.data.current.type === types.CONTAINER) {
        setActiveContainer(active.data.current);
        setDragStatus({ draggingContainer: true, draggingCard: false });
      } else {
        setActiveCard(active.data.current);
        setDragStatus({ draggingContainer: false, draggingCard: true });
      }
      if (!interacted.current) interacted.current = true;
    }
    setDragged(true);
    console.log("handleDragMove");
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
        lastActiveCard={lastActiveCard}
        activeContainer={activeContainer}
        refresh={refresh}
        isOverlay={false}
        dragStatus={dragStatus}
        interacted={interacted}
        isActive={
          activeContainer && activeContainer.id === container.id ? true : false
        }
      />
    );
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function closeCardForm() {
    refresh();
    setShowCardForm(false);
  }

  return (
    <div className="Board">
      {showCardForm && lastActiveCard && (
        <CardForm cardData={lastActiveCard} closeCardForm={closeCardForm} />
      )}
      <div className="Board-grid">
        <DndContext
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
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
                dragStatus={dragStatus}
                interacted={interacted}
                showCardInfo={null}
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
