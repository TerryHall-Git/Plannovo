import { useContext, useState } from "react";
import AddProjectTile from "../components/AddProjectTile";
import Tile from "../components/Tile";
import NewProjectForm from "../components/NewProjectForm";
import { ProjectContext } from "../App.js";
import "../styles/Projects.css";

export default function Projects() {
  const [, setActiveProject, projMgr] = useContext(ProjectContext);
  const [formShowing, setFormShowing] = useState(false);
  const [projects, setProjects] = useState(projMgr.getProjects());

  let tileCreated = (name, desc) => {
    projMgr.createNewProject(name, desc);
    setProjects(projMgr.getProjects());
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
    setProjects(projMgr.getProjects());
    setActiveProject(projMgr.getActiveProject());
  };

  let activeProjectId = projMgr.getActiveProjectId();

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
            <AddProjectTile action={() => setFormShowing(true)} />
            {Object.keys(projects).map((key) => {
              const { name, desc } = projects[key];
              console.log(key);
              return (
                <Tile
                  key={key}
                  isActive={activeProjectId === key}
                  title={name}
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
