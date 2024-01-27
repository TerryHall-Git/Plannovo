import { useContext, useState } from "react";
import TileAdd from "../components/TileAdd.js";
import Tile from "../components/Tile";
import TileInputForm from "../components/TileInputForm.js";
import { ProjectContext } from "../App.js";
import "../styles/TileGrid.css";

/**
 * This page allows users to create new projects, change the active project,
 * and lists all available projects
 */
export default function Projects() {
  const { setActiveProject, setActiveBoard, projMgr } =
    useContext(ProjectContext);
  const [formShowing, setFormShowing] = useState(false);
  const [projects, setProjects] = useState(projMgr.getProjects());

  //Event listener: create new project
  function tileCreated(name, desc) {
    projMgr.createNewProject(name, desc);
    setProjects(projMgr.getProjects());
    setActiveProject(projMgr.getActiveProject());
    setActiveBoard(projMgr.getActiveBoard());
  }

  //Event listener: activate project
  function tileActivated({ key }) {
    projMgr.setActiveProject(key);
    setActiveProject(projMgr.getActiveProject());
    setActiveBoard(projMgr.getActiveBoard());
  }

  //Event listener: delete project
  function tileDeleted({ key, confirmDelete }) {
    if (confirmDelete) {
      projMgr.removeProject(key);
      setActiveProject(projMgr.getActiveProject());
      setActiveBoard(projMgr.getActiveBoard());
      setProjects(projMgr.getProjects());
    }
  }

  let activeProjectId = projMgr.getActiveProjectId();

  return (
    <div className="TileGrid">
      <div className="TileGrid-content">
        {formShowing ? (
          <TileInputForm
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
