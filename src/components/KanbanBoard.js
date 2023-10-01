// import { Col, Container, Row } from 'react-bootstrap';
import '../styles/KanbanBoard.css';
import React, { useState, useEffect } from 'react';
import { Droppable } from './Droppable';
import {DndContext} from '@dnd-kit/core';
import KanbanContainer from './KanbanContainer';


const KanbanBoard = () => {
   
    const [containers, setContainers] = useState({}); //{id: null}

    useEffect(()=>{
        fetch("./containerData.json")
        .then((res) => res.json())
        .then((data) => {
            setContainers(data);
        });

    },[])

    
    function handleDragEnd({active, over}) {
        let updatedContainers = {...containers};

        let {cardKey, parentKey} = active.data.current;
        let {containerKey} = over.data.current;

        if(containerKey !== parentKey) {
            updatedContainers[containerKey].cards[cardKey] = updatedContainers[parentKey].cards[cardKey];
            delete updatedContainers[parentKey].cards[cardKey];

             setContainers(updatedContainers);
        }
    }

    const containerMarkup = Object.keys(containers).map((containerID, index1) => {
        return <Droppable key={containerID} id={containerID} data={{containerKey: containerID, containerIndex: index1}}  >
            <KanbanContainer key={containerID} myContainerID={containerID} myContainer={containers[containerID]} />
        </Droppable>
    }) 


    return (
        <div style={{display: 'flex'}}>
            <DndContext onDragEnd={handleDragEnd}>
                {containerMarkup}
            </DndContext>
        </div>
    );
}
export default KanbanBoard;