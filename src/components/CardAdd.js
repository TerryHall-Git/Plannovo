import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../App";
import "../styles/CardAdd.css";

export default function CardAdd({ containerIdx, refresh }) {
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
    refresh();
    setShowInput(false);
  }

  return (
    <div
      className="CardAdd"
      onMouseLeave={() => setMouseLeft(true)}
      onMouseEnter={() => setMouseLeft(false)}
    >
      {showInput ? (
        <div className="CardAdd-content">
          <input
            autoFocus
            type="text"
            id="title"
            className="CardAdd-input-grow"
            value={title}
            onFocus={() => setLostFocus(false)}
            onBlur={() => setLostFocus(true)}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={createNewCard}>Add</button>
        </div>
      ) : (
        <div
          className="CardAdd-content"
          onClick={() => {
            if (!showInput) setShowInput(true);
          }}
        >
          <p>+ Add Card</p>
        </div>
      )}
    </div>
  );
}
