import { useContext, useState } from "react";
import { ProjectContext } from "../App";
import "../styles/ContainerAdd.css";

export default function ContainerAdd() {
  const { activeProject, activeBoard, setActiveBoard, projMgr } =
    useContext(ProjectContext);
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  function createNewContainer() {
    console.log("title: " + title.trim());
    if (title.trim() === "") return;
    projMgr.createNewContainer(activeProject.id, activeBoard.id, title);
    setActiveBoard(projMgr.getActiveBoard());
    setShowInput(false);
    console.log("UPDATED");
  }

  return (
    <div className="ContainerAdd" onClick={() => setShowInput(true)}>
      <div className="ContainerAdd-content">
        {showInput ? (
          <div>
            <input
              autoFocus
              type="text"
              id="title"
              className="ContainerAdd-input-grow"
              value={title}
              // onBlur={() => setShowInput(false)}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={createNewContainer}>Add</button>
          </div>
        ) : (
          <p>+ Add New List</p>
        )}
      </div>
    </div>
  );
}
