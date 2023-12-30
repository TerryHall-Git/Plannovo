import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../App";
import "../styles/ContainerAdd.css";

export default function ContainerAdd({ refresh }) {
  const { activeProject, activeBoard, setActiveBoard, projMgr } =
    useContext(ProjectContext);
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [mouseLeft, setMouseLeft] = useState(false);
  const [lostFocus, setLostFocus] = useState(false);

  useEffect(() => {
    if (mouseLeft && showInput && lostFocus) {
      setTitle("");
      setShowInput(false);
    }
  }, [mouseLeft, showInput, lostFocus]);

  function createNewContainer() {
    if (title.trim() === "") return;
    projMgr.createNewContainer(activeProject.id, activeBoard.id, title);
    setActiveBoard(projMgr.getActiveBoard());
    setShowInput(false);
    refresh();
  }

  return (
    <div
      className="ContainerAdd"
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
