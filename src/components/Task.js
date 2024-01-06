import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Task.css";
import { useEffect, useRef, useState } from "react";

export default function Task({
  taskId,
  idx,
  title,
  complete,
  subTasks,
  addNewSubTask,
  updateTask,
}) {
  const [showChildTasks, setShowChildTasks] = useState(false);

  const primaryClass = complete ? "Task Task-completedBorder" : "Task";

  return (
    <div className={primaryClass}>
      <div className="Task-header">
        <p>{title}</p>
      </div>
      {!subTasks.length ? (
        complete ? (
          <button className="Task-btn Task-complete">
            <FontAwesomeIcon icon="fa-solid fa-circle-check" />
          </button>
        ) : (
          <button className="Task-btn">
            <FontAwesomeIcon icon="fa-regular fa-circle" />
          </button>
        )
      ) : (
        <div className="Task-progresInfo">
          <div className="Task-progressBar">
            <div className="Task-progress"></div>
          </div>
        </div>
      )}
      <button className="Task-btn" onClick={addNewSubTask}>
        <FontAwesomeIcon icon="fa-solid fa-plus" />
      </button>
      {subTasks.length > 0 &&
        (showChildTasks ? (
          <button className="Task-btn" onClick={() => setShowChildTasks(false)}>
            <FontAwesomeIcon icon="fa-solid fa-chevron-down" />
          </button>
        ) : (
          <button className="Task-btn" onClick={() => setShowChildTasks(true)}>
            <FontAwesomeIcon icon="fa-solid fa-chevron-up" />
          </button>
        ))}
    </div>
  );
}
