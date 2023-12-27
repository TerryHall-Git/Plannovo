import { useState } from "react";
import "../styles/ContainerAdd.css";

export default function ContainerAdd() {
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="ContainerAdd" onMouseOut={() => setShowInput(false)}>
      <div className="ContainerAdd-content">
        {showInput ? (
          <input
            type="text"
            id="title"
            value={title}
            onBlur={() => setShowInput(false)}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <button onClick={() => setShowInput(true)}>+ Add New List</button>
        )}
      </div>
    </div>
  );
}
