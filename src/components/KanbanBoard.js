// import { Col, Container, Row } from 'react-bootstrap';
import '../styles/KanbanBoard.css';
import React, { useState, useEffect, useRef } from 'react';
import { Droppable } from './Droppable';
import KanbanContainer from './KanbanContainer';
import { createPortal } from "react-dom";
// import { v4 as uuidv4 } from 'uuid';
import {
    DndContext,
    DragEndEvent,
    DragMoveEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    closestCorners,
    useSensor,
    useSensors,
  } from '@dnd-kit/core';
  import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
  } from '@dnd-kit/sortable';
import KanbanCard from './KanbanCard';


const KanbanBoard = () => {
   
    const [containers, setContainers] = useState([]); //{id: null}
    // const [activeId, setActiveId] = useState('');
    const [activeCard, setActiveCard] = useState(null);
    const [activeContainer, setActiveContainer] = useState(null);

    // const [isDraggingCard, setIsDraggingCard] = useState(false);
    
    useEffect(()=>{
        fetch("./containerData.json")
        .then((res) => res.json())
        .then((data) => {
            setContainers(data.containers);
        });

    },[])

    //container vs card? same container?
    
    function handleDragEnd({active, over}) {
        if(!over) {
            console.log("no 'over'");
            return;
        }

        let updatedContainers = [...containers];

        console.log(over.data.current.type);
        if(over.data.current.type === 'container') {
            let overContainer = over.data.current;
            console.log("not implemented");
        } else if(over.data.current.type === 'card') {
            let overParentIdx = over.data.current.parentIdx;
            let overIdx = over.data.current.idx;
            let activeParentIdx = active.data.current.parentIdx;
            let activeIdx = active.data.current.idx;

            //swap card positions
            // let tmp = updatedContainers[activeParentIdx].cards[activeIdx];
            // updatedContainers[activeParentIdx].cards[activeIdx] = updatedContainers[overParentIdx].cards[overIdx];
            // updatedContainers[overParentIdx].cards[overIdx] = tmp;

            let activeCard = {...updatedContainers[activeParentIdx].cards[activeIdx]};
            updatedContainers[activeParentIdx].cards.splice(activeIdx, 1);
            updatedContainers[overParentIdx].cards = [
                ...updatedContainers[overParentIdx].cards.slice(0, overIdx),
                activeCard,
                ...updatedContainers[overParentIdx].cards.slice(overIdx)
            ];
            
            //update index info
            updatedContainers.forEach((container, idx1)=>{
                container.idx = idx1;
                container.cards.forEach((card, idx2) => {
                     card.parentIdx = idx1;
                     card.idx = idx2;
                });
            });

            setContainers(updatedContainers);
            console.log("card swap complete");
            //debug
            // updatedContainers.forEach((container)=>{
            //     console.log("container: ", container.name + " [" +  container.idx + "]");
            //     container.cards.forEach(card => console.log("   card: ", card.name + " [" + card.idx + "] parent: [" + card.parentIdx + "]"))
            // });
        } else {
            console.log("wut?");
        }

        // setActiveId('');
        // setIsDraggingCard(false);
        setActiveCard(null);
    }

    function handleDragOver({active, over}) {
        if(!over) {
            console.log("no over");
            return;
        }
        console.log("handleDragOver");
        
        over = over.data.current;
        active = active.data.current;

        //get 'over' container index
        let overContainerIdx = (over.type === 'container') ? over.idx : over.parentIdx;

        if(over.type === 'container') {
            
        }
        
        
        if(active.parentIdx !== overContainerIdx) {
            console.log("change containers");
            let updatedContainers = [...containers];
            let activeCard = updatedContainers[active.parentIdx].cards[active.idx];
            updatedContainers[overContainerIdx].cards.push(activeCard);
            updatedContainers[active.parentIdx].cards.splice(active.idx, 1)

            //update index info
            updatedContainers.forEach((container, idx1)=>{
                container.idx = idx1;
                container.cards.forEach((card, idx2) => {
                     card.parentIdx = idx1;
                     card.idx = idx2;
                });
            });

            //debug
            // updatedContainers.forEach((container)=>{
            //     //console.log("container: ", container.name + " [" +  container.idx + "]");
            //     container.cards.forEach(card => console.log("   card: ", card.name + " [" + card.idx + "] parent: [" + card.parentIdx + "]"))
            // });


            setContainers(updatedContainers);
        }

    }

    function handleDragStart({active, over}) {
        console.log("handleDragStart");
        // setActiveId(active.id);
        setActiveCard(active.data.current);
        // setIsDraggingCard(true);
    }

    function handleDrag({active, over}) {

    }


    
    const containerMarkup = containers.map((container, idx) => {
        return <KanbanContainer key={container.name} id={container.name} parentIdx={idx} data={container} activeCard={activeCard} />
    }) 

    return (
            <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragMove={handleDrag} onDragStart={handleDragStart}  >
                <div style={{display: 'flex', flexDirection: 'row', width: '100vw', height: '100vh'}}>
                    {containerMarkup}
                </div>
                {activeCard && 
                    <DragOverlay adjustScale={false}>
                        <KanbanCard title={activeCard.title} classStyle='KanbanCardDragging' />
                    </DragOverlay>
                }
            </DndContext>
    );
}
export default KanbanBoard;