import { useEffect, useState } from "react";
import AddProjectTile from "../components/AddProjectTile";
import ProjectTile from "../components/ProjectTile";
import NewProjectForm from "../components/NewProjectForm";
import {getProjects, createNewProject} from "../utils.js";
import "../styles/Projects.css";

export default function Projects() {
  const [formShowing, setFormShowing] = useState(false);
  const [projects, setProjects] = useState(getProjects());

  const addNewProject = () => {
    setFormShowing(true);
  };

  function createProject(name, desc) {
    createNewProject(name, desc);
    setProjects(getProjects());
    setFormShowing(false);
  }

  return (
    <div className="Projects">
      <div className="Projects-content">
        {formShowing ? (
          <NewProjectForm createProject={createProject} />
        ) : (
          <div className="Projects-grid">
            <AddProjectTile addNewProject={addNewProject} />
            {Object.keys(projects).map(key=> {
              const {name, desc} = projects[key];
              return (
                <ProjectTile
                  key={key}
                  projName={name}
                  projDesc={desc}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
