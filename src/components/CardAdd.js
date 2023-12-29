import { useContext, useState } from "react";
import { ProjectContext } from "../App";
import "../styles/Card.css";

export default function CardAdd({ containerIdx }) {
  const { activeProject, activeBoard, setActiveBoard, projMgr } =
    useContext(ProjectContext);
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  function createNewCard() {
    if (title.trim() === "") return;
    projMgr.createNewCard(
      activeProject.id,
      activeBoard.id,
      containerIdx,
      title,
      ""
    );
    setActiveBoard(projMgr.getActiveBoard());
    setShowInput(false);
  }

  return (
    <div className="CardAdd" onClick={() => setShowInput(true)}>
      <div className="CardAdd-content">
        {showInput ? (
          <div>
            <input
              autoFocus
              type="text"
              id="title"
              className="CardAdd-input-grow"
              value={title}
              // onBlur={() => setShowInput(false)}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={createNewCard}>Add</button>
          </div>
        ) : (
          <p>+ New Card</p>
        )}
      </div>
    </div>
  );
}
