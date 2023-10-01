import '../styles/KanbanCard.css';

const KanbanCard = ({title}) => {
    return (
        <div className='KanbanCard'>
            <div className='wrapper'>
                <div className='title'>
                    <h3>{title}</h3>
                </div>
            </div>
        </div>
    );
}
export default KanbanCard;