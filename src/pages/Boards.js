import { useContext, useState } from "react";
import TileAdd from "../components/TileAdd.js";
import Tile from "../components/Tile";
import NewProjectForm from "../components/TileInputForm.js";
import { ProjectContext } from "../App.js";
import "../styles/Projects.css";

export default function Boards() {
  const { activeProject, setActiveBoard, projMgr } = useContext(ProjectContext);
  const [formShowing, setFormShowing] = useState(false);
  const [boards, setBoards] = useState(projMgr.getBoards());

  let tileCreated = (name, desc) => {
    projMgr.createNewBoard(activeProject.id, name, desc);
    setBoards(projMgr.getBoards());
    setActiveBoard(projMgr.getActiveBoard());
  };

  let tileActivated = ({ key }) => {
    projMgr.setActiveBoard(key);
    setActiveBoard(projMgr.getActiveBoard());
  };

  let tileDeleted = ({ key, confirmDelete }) => {
    if (confirmDelete) {
      projMgr.removeBoard(projMgr.getActiveProjectId(), key);
      setBoards(projMgr.getBoards());
      setActiveBoard(projMgr.getActiveBoard());
    }
  };

  let activeBoardId = projMgr.getActiveBoardId();

  return (
    <div className="TileGrid">
      <div className="TileGrid-content">
        {formShowing ? (
          <NewProjectForm
            title="Create New Board"
            createProject={tileCreated}
            setFormShowing={setFormShowing}
          />
        ) : (
          <div className="TileGrid-grid">
            <TileAdd action={() => setFormShowing(true)} />
            {Object.keys(boards).map((key) => {
              const { title, desc } = boards[key];
              return (
                <Tile
                  key={key}
                  isActive={activeBoardId === key}
                  title={title}
                  desc={desc}
                  tileDeleted={tileDeleted}
                  tileActivated={tileActivated}
                  tileCallbackData={{ key }}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
