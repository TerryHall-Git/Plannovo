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
  const MAX_CHARS = 64;

  useEffect(() => {
    if (mouseLeft && showInput && lostFocus) {
      reset();
    }
  }, [mouseLeft, showInput, lostFocus]);

  //Event listener: creates a new card
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
    reset();
  }

  function reset() {
    setTitle("");
    setShowInput(false);
  }

  //Event listener: on key press
  function keyPress(e) {
    //on "enter"
    if (e.keyCode === 13) createNewCard();
  }

  //Event listener: on-change
  function onChangeHandler(e) {
    let el = e.target;
    let len = el.value.length;

    //limit text input
    el = len < MAX_CHARS ? el.value : el.value.substring(0, MAX_CHARS);

    setTitle(el.value);
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
            onChange={onChangeHandler}
            onKeyUp={keyPress}
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
