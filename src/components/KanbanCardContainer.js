// import { Col, Container, Row } from 'react-bootstrap';
import '../styles/KanbanCardContainer.css';
import React, { useState, useEffect, useRef } from 'react';
import KanbanCard from './KanbanCard';
import { Droppable } from './Droppable';
import {DndContext} from '@dnd-kit/core';
import Draggable from './Draggable';


const KanbanCardContainer = () => {
   
    const [containers, setContainers] = useState([]); //{id: null}

    useEffect(()=>{
        fetch("./containerData.json")
        .then((res) => res.json())
        .then((data) => {
            setContainers(data.data);
        });

    },[])

    function handleDragEnd({active, over}) {

        let newContainers = [...containers];

        let toContainer = newContainers.filter(c => c.id === over.data.current.id)[0]; 
        let fromContainer = newContainers.filter(c => c.id === active.data.current.parent.id)[0]; 
        let card = fromContainer.cards.filter(c => c.id === active.data.current.id)[0];

        //let fromContainer = card.parent;
        //let cardIdx = containers.filter(c => c.id === card.id)[0];

        console.log("from: " + fromContainer.id);
        console.log("to: " + toContainer.id);
        
        // let targetContainer = containers.filter(c => c.id === over.id)[0];
        // if(targetContainer.type !== "container") return;
        

        //add card to container

        console.log("moving card");

        //let newContainers = [...containers];
        
        if(toContainer.id !== fromContainer.id) {
            let cardIdx = Number(card.idx); //TODO: HOW IS THIS NOT WORKING!!!?
            console.log(cardIdx);
            console.log(card);
            toContainer.cards.push(card);
            fromContainer.cards.splice(cardIdx, 1);
            card.idx = toContainer.cards.length - 1;

            setContainers(newContainers);

            // setContainers([...containers,
            //     {}
            // ]);
        }

        // newContainers.forEach(container => {
        //     if(container.id !== over.id) { //remove card from other containers
        //         container.cards = container.cards.filter(crd => crd.id !== active.id);
        //     }
        // })

        //setContainers([...containers]);

        // if(over) {
        //     setContainers({
        //         ...containers,
        //         [targetContainer.id]: 
        //     });
        // }

    }

    const containerMarkup = containers.map((container, idx1) => (
        <Droppable key={container.id} id={container.id}  data={{...container, idx: idx1}} >
            <div className='KanbanCardContainer'>
                {
                    container.cards.map((card, idx2) => (
                        <Draggable key={card.id} id={card.id} data={{...card, parent: container, idx: idx2}} >
                            <div className='KanbanCard'>
                                {card.title}
                            </div>
                        </Draggable>  
                        )
                    )
                }
            </div>
        </Droppable>
    ));


    return (
        <div style={{display: 'flex'}}>
            <DndContext onDragEnd={handleDragEnd}>
                {containerMarkup}
            </DndContext>
        </div>
    );
}
export default KanbanCardContainer;