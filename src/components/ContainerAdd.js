import { useState } from "react";
import "../styles/ContainerAdd.css";

export default function ContainerAdd() {
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  let onBlurHandler = (e) => {
    // e.target.className = "ContainerAdd-input-shrink";
    setShowInput(false);
  };

  let onClickHandler = (e) => {
    // e.target.className = "ContainerAdd-input-grow";
    setShowInput(true);
  };

  return (
    <div className="ContainerAdd" onClick={onClickHandler}>
      <div className="ContainerAdd-content">
        {showInput ? (
          <div>
            <input
              autoFocus
              type="text"
              id="title"
              className="ContainerAdd-input"
              value={title}
              onBlur={onBlurHandler}
              onChange={() => setTitle()}
            />
            <button>Add</button>
          </div>
        ) : (
          <p>+ Add New List</p>
        )}
      </div>
    </div>
  );
}
