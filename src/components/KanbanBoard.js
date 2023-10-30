// import { Col, Container, Row } from 'react-bootstrap';
import '../styles/KanbanBoard.css';
import React, { useState, useEffect, useRef } from 'react';
import { Droppable } from './Droppable';
import KanbanContainer from './KanbanContainer';
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


const KanbanBoard = () => {
   
    const [containers, setContainers] = useState([]); //{id: null}
    const [activeId, setActiveId] = useState('')

    const [isDragging, setIsDragging] = useState(false);
    
    useEffect(()=>{
        fetch("./containerData.json")
        .then((res) => res.json())
        .then((data) => {
            setContainers(data.containers);
        });

    },[])

    //container vs card? same container?
    
    // function handleDragEnd({active, over}) {
    //     if(!over) return;

    //     let updatedContainers = [...containers];

    //     if(over.data.current.type === 'container') {
    //         let overContainer = over.data.current;

    //     } else if(over.data.current.type === 'card') {
    //         let overParentIdx = over.data.current.parentIdx;
    //         let overIdx = over.data.current.idx;
    //         let activeParentIdx = active.data.current.parentIdx;
    //         let activeIdx = active.data.current.idx;

    //         //swap card positions
    //         // let tmp = updatedContainers[activeParentIdx].cards[activeIdx];
    //         // updatedContainers[activeParentIdx].cards[activeIdx] = updatedContainers[overParentIdx].cards[overIdx];
    //         // updatedContainers[overParentIdx].cards[overIdx] = tmp;

    //         let activeCard = {...updatedContainers[activeParentIdx].cards[activeIdx]};
    //         updatedContainers[activeParentIdx].cards.splice(activeIdx, 1);
    //         updatedContainers[overParentIdx].cards = [
    //             ...updatedContainers[overParentIdx].cards.slice(0, overIdx),
    //             activeCard,
    //             ...updatedContainers[overParentIdx].cards.slice(overIdx)
    //         ];
            
    //         //update index info
    //         updatedContainers.forEach((container, idx1)=>{
    //             container.idx = idx1;
    //             container.cards.forEach((card, idx2) => {
    //                  card.parentIdx = idx1;
    //                  card.idx = idx2;
    //             });
    //         });

    //         setContainers(updatedContainers);

    //         //debug
    //         updatedContainers.forEach((container)=>{
    //             console.log("container: ", container.name + " [" +  container.idx + "]");
    //             container.cards.forEach(card => console.log("   card: ", card.name + " [" + card.idx + "] parent: [" + card.parentIdx + "]"))
    //         });
    //     }

    //     setActiveId('');
    // }

    function handleDragStart({active, over}) {
        setActiveId(active.id);
        setIsDragging(true);
    }


    function handleDragEnd({active, over}) {
        setIsDragging(false);
    }

    function handleDragOver({active, over}) {
        if(!active || !over || active === over) return;

        return;
    }

    function handleDrag({active, over}) {
        if(!active || !over || active === over) return;
        
        over = over.data.current;
        active = active.data.current;

        if(over.type === 'container' && over.idx !== active.parentIdx) {
            console.log("card-over-container, different container");
            swapContainers(active, over.idx);
        }
        if(over.type === 'card' && over.parentIdx !== active.parentIdx) {
            console.log("card-over-card, different container");
            swapContainers(active, over.parentIdx);
        }
        

    }

    function swapContainers(card, toContainerIdx) {
        let updatedContainers = [...containers];
        let activeCard = {...containers[card.parentIdx].cards[card.idx]}; //copy of original
        updatedContainers[card.parentIdx].cards.splice(card.idx, 1) //remove card from old container
        updatedContainers[toContainerIdx].cards.push(activeCard); //add card to new container

        //update index info
        updatedContainers.forEach((container, idx1)=>{
            container.idx = idx1;
            container.cards.forEach((card, idx2) => {
                    card.parentIdx = idx1;
                    card.idx = idx2;
            });
        });
        console.log(updatedContainers);

        setContainers(updatedContainers);

        //debug
        updatedContainers.forEach((container)=>{
            console.log("container: ", container.name + " [" +  container.idx + "]");
            container.cards.forEach(card => console.log("   card: ", card.name + " [" + card.idx + "] parent: [" + card.parentIdx + "]"))
        });
    }

    // function handleDragOver({active, over}) {
    //     if(!over) return;
        
    //     over = over.data.current;
    //     active = active.data.current;

    //     //get 'over' container index
    //     let overContainerIdx = (over.type === 'container') ? over.idx : over.parentIdx;
        
        
    //     if(active.parentIdx !== overContainerIdx) {
    //         console.log("change containers");
    //         let updatedContainers = [...containers];
    //         let activeCard = updatedContainers[active.parentIdx].cards[active.idx];
    //         updatedContainers[overContainerIdx].cards.push(activeCard);
    //         updatedContainers[active.parentIdx].cards.splice(active.idx, 1)

    //         //update index info
    //         updatedContainers.forEach((container, idx1)=>{
    //             container.idx = idx1;
    //             container.cards.forEach((card, idx2) => {
    //                  card.parentIdx = idx1;
    //                  card.idx = idx2;
    //             });
    //         });

    //         //debug
    //         updatedContainers.forEach((container)=>{
    //             console.log("container: ", container.name + " [" +  container.idx + "]");
    //             container.cards.forEach(card => console.log("   card: ", card.name + " [" + card.idx + "] parent: [" + card.parentIdx + "]"))
    //         });

    //         setContainers(updatedContainers);
    //     }

    // }

    
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        }),
      );

    
    const containerMarkup = containers.map((container, idx) => {
        return <Droppable key={container.name} id={container.name} data={container}  >
            <KanbanContainer key={"container_"+container.name} parentIdx={idx} myContainer={containers[idx]} activeId={activeId} isDragging={isDragging} />
        </Droppable>
    }) 


    return (
        <div style={{display: 'flex'}}>
            <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragMove={handleDrag} onDragStart={handleDragStart} sensors={sensors}
            collisionDetection={closestCorners} >
                {containerMarkup}
            </DndContext>
        </div>
    );
}
export default KanbanBoard;