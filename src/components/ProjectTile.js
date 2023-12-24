import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Animation.css";
import "../styles/ProjectTile.css";
import ConfirmationBox from "./ConfirmationBox";
import { useState } from "react";

export default function ProjectTile({projKey, projName, projDesc, deleteProject }) {
  const [showConfirmBox, setShowConfirmBox] = useState(false);

  function confirmCallback(confirm) {
    setShowConfirmBox(false);
    deleteProject(confirm, projKey);
  }

  return (
    <div className="ProjectTile appearAnimation enlargeOnHover">
      <div className="ProjectTile-header">
          <div>
            <p>{projName}</p>
          </div>
          <div>
            <FontAwesomeIcon 
              className="ProjectTile-trashIcon" 
              icon="fa-solid fa-trash-can" 
              onClick={()=> setShowConfirmBox(true)}
            />
          </div>
      </div>
      {showConfirmBox ? 
        <ConfirmationBox question="Are you sure?" confirmCallback={confirmCallback} /> 
      : 
        <div>
          <p>{projDesc}</p>
        </div>
      } 
    </div>
  );
}
