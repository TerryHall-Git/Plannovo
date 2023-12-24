import {useEffect, useState} from "react";
import AddProjectTile from "../components/AddProjectTile";
import ProjectTile from "../components/ProjectTile";
import NewProjectForm from "../components/NewProjectForm";
import {getProjects, createNewProject, removeProject} from "../utils.js";
import "../styles/Projects.css";

export default function Projects() {
  const [formShowing, setFormShowing] = useState(false);
  const [projects, setProjects] = useState(getProjects());

  function createProject(name, desc) {
    createNewProject(name, desc);
    setProjects(getProjects());
  }
  
  function deleteProject(confirmDelete, key) {
    if(confirmDelete) {
      removeProject(key);
      setProjects(getProjects());
    } 
  }

  return (
    <div className="Projects">
      <div className="Projects-content">
        {formShowing ? (
          <NewProjectForm createProject={createProject} setFormShowing={setFormShowing} />
        ) : (
          <div className="Projects-grid">
            <AddProjectTile showForm={()=> setFormShowing(true)} />
            {Object.keys(projects).map(key=> {
              const {name, desc} = projects[key];
              console.log(key);
              return (
                <ProjectTile
                  key={key}
                  projKey={key}
                  projName={name}
                  projDesc={desc}
                  deleteProject={deleteProject}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
