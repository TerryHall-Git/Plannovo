import { useState } from "react";
import "../styles/ContainerAdd.css";

export default function ContainerAdd() {
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

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
              onBlur={() => setShowInput(false)}
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
