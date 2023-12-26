import { useContext, useState } from "react";
import TileAdd from "../components/TileAdd.js";
import Tile from "../components/Tile";
import NewProjectForm from "../components/TileInputForm.js";
import { ProjectContext } from "../App.js";
import "../styles/Projects.css";

export default function Projects() {
  const { setActiveProject, setActiveBoard, projMgr } =
    useContext(ProjectContext);
  const [formShowing, setFormShowing] = useState(false);
  const [projects, setProjects] = useState(projMgr.getProjects());

  let tileCreated = (name, desc) => {
    projMgr.createNewProject(name, desc);
    setProjects(projMgr.getProjects());
    setActiveProject(projMgr.getActiveProject());
    setActiveBoard(projMgr.getActiveBoard());
  };

  let tileActivated = ({ key }) => {
    projMgr.setActiveProject(key);
    setActiveProject(projMgr.getActiveProject());
    setActiveBoard(projMgr.getActiveBoard());
  };

  let tileDeleted = ({ key, confirmDelete }) => {
    if (confirmDelete) {
      projMgr.removeProject(key);
      setProjects(projMgr.getProjects());
      setActiveProject(projMgr.getActiveProject());
      setActiveBoard(projMgr.getActiveBoard());
    }
  };

  let activeProjectId = projMgr.getActiveProjectId();

  return (
    <div className="TileGrid">
      <div className="TileGrid-content">
        {formShowing ? (
          <NewProjectForm
            title="Create New Project"
            createProject={tileCreated}
            setFormShowing={setFormShowing}
          />
        ) : (
          <div className="TileGrid-grid">
            <TileAdd action={() => setFormShowing(true)} />
            {Object.keys(projects).map((key) => {
              const { title, desc } = projects[key];
              return (
                <Tile
                  key={key}
                  isActive={activeProjectId === key}
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
