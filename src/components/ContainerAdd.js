import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../App";
import "../styles/ContainerAdd.css";

/**
 * This component is used to create new containers
 */
export default function ContainerAdd({ refresh }) {
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

  function createNewContainer() {
    if (title.trim() === "") return;
    projMgr.createNewContainer(activeProject.id, activeBoard.id, title);
    setActiveBoard(projMgr.getActiveBoard());
    setShowInput(false);
    refresh();
    reset();
  }

  function reset() {
    setTitle("");
    setShowInput(false);
  }

  //Event listener: on key press
  function keyPress(e) {
    if (e.keyCode === 13) createNewContainer(); //on-Enter
  }

  return (
    <div
      className="ContainerAdd appearAnimation"
      onMouseLeave={() => setMouseLeft(true)}
      onMouseEnter={() => setMouseLeft(false)}
    >
      {showInput ? (
        <div className="ContainerAdd-content">
          <input
            autoFocus
            type="text"
            id="title"
            className="ContainerAdd-input-grow"
            value={title}
            onFocus={() => setLostFocus(false)}
            onBlur={() => setLostFocus(true)}
            onChange={(e) => setTitle(e.target.value)}
            onKeyUp={keyPress}
          />
          <button onClick={createNewContainer}>Add</button>
        </div>
      ) : (
        <div
          className="ContainerAdd-content"
          onClick={() => {
            if (!showInput) setShowInput(true);
          }}
        >
          <p>+ Add New List</p>
        </div>
      )}
    </div>
  );
}
