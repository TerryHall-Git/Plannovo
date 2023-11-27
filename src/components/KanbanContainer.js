import { useSensors, useSensor, PointerSensor,
        KeyboardSensor, closestCorners } from '@dnd-kit/core';
import '../styles/KanbanContainer.css';
import KanbanCard from './KanbanCard';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {useDroppable} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';


const KanbanContainer = (props) => {
    const {setNodeRef} = useDroppable({
        id: props.id,
        data: props.data,
        parent: props.parent,
        idx: props.idx,
    });
    const {data, activeCard} = props;
    
    let cards = data.cards;
    let cardsMarkup = cards.map(card => (
            <KanbanCard key={card.name} id={card.name} title={card.title} isDragging={activeCard && activeCard.name === card.name ? true : false} classStyle='KanbanCard' data={card} />
        )
    )    

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
    );
      
    return (
        <div ref={setNodeRef} className='KanbanContainer'>
            <SortableContext items={cards.map(card=>card.name)} sensors={sensors} collisionDetection={closestCorners} strategy={verticalListSortingStrategy}>
                {cardsMarkup}
            </SortableContext>
        </div>
    );

}
export default KanbanContainer;