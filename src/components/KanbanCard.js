import '../styles/KanbanCard.css';

const KanbanCard = ({title,isDragging=false,classStyle='KanbanCard'}) => {

    if(isDragging) classStyle = 'KanbanCardOutline';
    
    return (
        <div className={classStyle}>
            <div className='wrapper'>
                {isDragging ?
                <div className='title'>
                </div>
                : 
                <div className='title'>
                    <h3>{title}</h3>
                </div>
                }
            </div>
        </div>
    );
}
export default KanbanCard;