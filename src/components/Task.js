import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Task.css";

export default function Task({
  taskData,
  toggleTask,
  activeTask,
  setActiveTask,
}) {
  const isActive = activeTask && activeTask.id === taskData.id;
  let cls = "Task";
  //add 'completed' style?
  cls = taskData.complete && !isActive ? cls + " Task-completed" : cls;
  //add 'active' style?
  cls = !taskData.complete && isActive ? cls + " Task-active" : cls;
  //add 'active-completed' style?
  cls = taskData.complete && isActive ? cls + " Task-active-completed" : cls;

  return (
    <div className={cls} onClick={() => setActiveTask(taskData)}>
      <div className="Task-header">
        <p>{taskData.title}</p>
      </div>
      {taskData.complete ? (
        <button
          className="Task-btn Task-complete"
          onClick={(e) => {
            e.stopPropagation();
            toggleTask(taskData.idx, false);
          }}
        >
          <FontAwesomeIcon icon="fa-solid fa-circle-check" />
        </button>
      ) : (
        <button
          className="Task-btn"
          onClick={(e) => {
            e.stopPropagation();
            toggleTask(taskData.idx, true);
          }}
        >
          <FontAwesomeIcon icon="fa-regular fa-circle" />
        </button>
      )}
    </div>
  );
}
