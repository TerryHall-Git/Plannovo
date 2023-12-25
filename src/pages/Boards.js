import { useContext, useState } from "react";
import TileAdd from "../components/TileAdd.js";
import Tile from "../components/Tile";
import NewProjectForm from "../components/NewProjectForm";
import { ProjectContext } from "../App.js";
import "../styles/Projects.css";

export default function Boards() {
  const [, setActiveProject, projMgr] = useContext(ProjectContext);
  const [formShowing, setFormShowing] = useState(false);
  const [boards, setBoards] = useState(projMgr.getBoards());

  let tileCreated = (name, desc) => {
    projMgr.createNewProject(name, desc);
    setBoards(projMgr.getBoards());
    setActiveProject(projMgr.getActiveProject());
  };

  let tileActivated = ({ key }) => {
    projMgr.setActiveProject(key);
    setActiveProject(projMgr.getActiveProject());
  };

  let tileDeleted = ({ key, confirmDelete }) => {
    if (confirmDelete) {
      projMgr.removeProject(key);
    }
    setBoards(projMgr.getBoards());
    setActiveProject(projMgr.getActiveProject());
  };

  let activeBoardId = projMgr.getActiveBoardId();

  return (
    <div className="Projects">
      <div className="Projects-content">
        {formShowing ? (
          <NewProjectForm
            createProject={tileCreated}
            setFormShowing={setFormShowing}
          />
        ) : (
          <div className="Projects-grid">
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
