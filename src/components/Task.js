import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Task.css";

/**
 * This component displays the details associated for the given task
 */
export default function Task({
  taskData,
  toggleTask,
  activeTask,
  setActiveTask,
}) {
  const isActive = activeTask && activeTask.id === taskData.id;

  //Dynamic styles
  let cls = "Task";
  cls = taskData.complete && !isActive ? cls + " Task-completed" : cls;
  cls = !taskData.complete && isActive ? cls + " Task-active" : cls;
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
