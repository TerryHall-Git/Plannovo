import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../App";
import "../styles/TaskAdd.css";

/**
 * This component is used to add a new task
 */
export default function TaskAdd({ cardData, refreshTaskList }) {
  const { activeProject, activeBoard, setActiveBoard, projMgr } =
    useContext(ProjectContext);
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [mouseLeft, setMouseLeft] = useState(false);
  const [lostFocus, setLostFocus] = useState(false);

  useEffect(() => {
    if (mouseLeft && showInput && lostFocus) {
      reset();
    }
  }, [mouseLeft, showInput, lostFocus]);

  function createNewTask() {
    if (title.trim() === "") return;
    projMgr.createNewTask(
      activeProject.id,
      activeBoard.id,
      cardData.parentIdx,
      cardData.idx,
      title
    );
    setActiveBoard(projMgr.getActiveBoard());
    refreshTaskList();
    setShowInput(false);
    reset();
  }

  function reset() {
    setTitle("");
    setShowInput(false);
  }

  function keyPress(e) {
    if (e.keyCode === 13) createNewTask();
  }

  return (
    <div
      className="TaskAdd"
      onMouseLeave={() => setMouseLeft(true)}
      onMouseEnter={() => setMouseLeft(false)}
    >
      {showInput ? (
        <div className="TaskAdd-content">
          <input
            autoFocus
            type="text"
            id="title"
            className="TaskAdd-input-grow"
            value={title}
            onFocus={() => setLostFocus(false)}
            onBlur={() => setLostFocus(true)}
            onChange={(e) => setTitle(e.target.value)}
            onKeyUp={keyPress}
          />
          <button onClick={createNewTask}>Add</button>
        </div>
      ) : (
        <div
          className="TaskAdd-content"
          onClick={() => {
            if (!showInput) setShowInput(true);
          }}
        >
          <p>+ Add Task</p>
        </div>
      )}
    </div>
  );
}
