import { DndContext, DragOverlay } from '@dnd-kit/core';
import '../styles/KanbanContainer.css';
import Draggable from './Draggable';
import KanbanCard from './KanbanCard';
import Sortable from './Sortable';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import {
    restrictToWindowEdges,
  } from '@dnd-kit/modifiers';

const KanbanContainer = ({myContainer, parentIdx, activeId, isDragging}) => {

    // Object.keys(myContainer.cards).map((card)=> console.log(card));

    //const [sortedCards, setSortedCards] = useState(Object.keys(myContainer.cards)); //TODO: pass this to sortable, then update card order? [card1_0, card3_1]
    //let sortedCards = Object.keys(myContainer.cards).sort((x,y)=> console.log(x));

    let cards = myContainer.cards;
    let activeCard = null;
    if(activeId !== '') activeCard = cards.filter(card=>card.name === activeId)[0];

    if(activeCard) console.log("ACTIVE");

    //let showDragOverlay = activeId !== '' && cards.map(card=>card.name === activeId).length > 0;
    // useEffect(()=>{
    //     setSortedCards()
    // },[sortedCards]);


    // const cardsMarkup = (
    //         <SortableContext items={sortedCards} strategy={verticalListSortingStrategy}>
    //         {
    //             sortedCards.map(cardID => (
    //                 <Sortable key={cardID} id={cardID}>
    //                     {/* <Draggable key={`draggable_${cardID}`} id={`draggable_${cardID}`} data={{cardKey: cardID, cardIndex: index2, parentKey: myContainerID}} > */}
    //                         <KanbanCard key={cardID} title={myContainer.cards[cardID].title} />
    //                     {/* </Draggable>   */}
    //                 </Sortable>
    //             ))
    //         }
    //         </SortableContext>
    //     )

        // const cardsMarkup = (
        //     <SortableContext items={cardNames} strategy={verticalListSortingStrategy}>
        //     {
        //         cards.map((card, idx) => {
        //             //If is over parent, then sort, else drag
        //             return (
        //                 <Sortable key={card.name} id={card.name} data={card}>
        //                     <KanbanCard key={`c_${card.name}`} id={`c_${card.name}`} title={card.title} isDragging={activeCard && activeId === card.name} />
        //                 </Sortable>
        //             )
        //         })
        //     }
        //     </SortableContext>
        // )


        // Object.keys(myContainer.cards).map((cardID, index2) => (
        //     <Sortable key={`sortable_${cardID}`} id={`sortable_${cardID}`}>
        //         {/* <Draggable key={`draggable_${cardID}`} id={`draggable_${cardID}`} data={{cardKey: cardID, cardIndex: index2, parentKey: myContainerID}} > */}
        //             <KanbanCard key={cardID} title={myContainer.cards[cardID].title} />
        //         {/* </Draggable>   */}
        //     </Sortable>
        // ))

    let cardsMarkup = cards.map(card => (
            <Sortable key={card.name} id={card.name} data={card}>
                <KanbanCard key={`c_${card.name}`} id={`c_${card.name}`} title={card.title} isDragging={activeCard && activeId === card.name} />
            </Sortable>
        )
    )    


    // return (
    //     <div id={"container_"+parentIdx} className='KanbanContainer'>
    //         <SortableContext items={cards.map(card=>card.name)} strategy={verticalListSortingStrategy}>
    //             {cardsMarkup}
    //         </SortableContext>
    //         {activeCard && isDragging &&
    //             <DragOverlay adjustScale={false}>
    //                 <KanbanCard title={activeCard.title} classStyle='KanbanCardDragging' />
    //             </DragOverlay>
    //         }
    //     </div>
    // );

    return (
        <div id={"container_"+parentIdx} className='KanbanContainer'>
            {/* <SortableContext items={cards.map(card=>card.name)} strategy={verticalListSortingStrategy}> */}
                {cardsMarkup}
            {/* </SortableContext> */}
            {activeCard && isDragging &&
                <DragOverlay adjustScale={false}>
                    <KanbanCard title={activeCard.title} classStyle='KanbanCardDragging' />
                </DragOverlay>
            }
        </div>
    );

    // <DragOverlay modifiers={[restrictToWindowEdges]} adjustScale={false}>
    //                 <KanbanCard title={activeCard.title} classStyle='KanbanCardDragging' />
    //             </DragOverlay>
    //         }

}
export default KanbanContainer;