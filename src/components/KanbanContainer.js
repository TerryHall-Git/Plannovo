import '../styles/KanbanContainer.css';
import Draggable from './Draggable';
import KanbanCard from './KanbanCard';

const KanbanContainer = ({myContainer, myContainerID}) => {

    const cardsMarkup = Object.keys(myContainer.cards).map((cardID, index2) => (
        <Draggable key={cardID} id={cardID} data={{cardKey: cardID, cardIndex: index2, parentKey: myContainerID}} >
            <KanbanCard title={myContainer.cards[cardID].title} />
        </Draggable>  
    ))

    return (
        <div id={myContainerID} className='KanbanContainer'>
            {cardsMarkup}
        </div>
    );
}
export default KanbanContainer;