import { useState } from "react";
import AddProjectTile from "../components/AddProjectTile";
import ProjectTile from "../components/ProjectTile";
import NewProjectForm from "../components/NewProjectForm";

export default function Projects() {
  const [formShowing, setFormShowing] = useState(false);

  const addNewProject = () => {
    setFormShowing(true);
  };
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        {formShowing ? (
          <NewProjectForm />
        ) : (
          <div className="grid grid-cols-4 gap-4">
            <AddProjectTile addNewProject={addNewProject} />
            <ProjectTile
              projName="Project 1"
              projDesc="This is a really interesting project. Don't you think?"
            />
            <ProjectTile
              projName="Project 2"
              projDesc="This is a really interesting project. Don't you think?"
            />
            <ProjectTile
              projName="Project 3"
              projDesc="This is a really interesting project. Don't you think?"
            />
            <ProjectTile projName="Project 4" />
            <ProjectTile projName="Project 5" />
            <ProjectTile projName="Project 6" />
          </div>
        )}
      </div>
    </div>
  );
}
