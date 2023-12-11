import AddProjectTile from "../components/AddProjectTile";
import ProjectTile from "../components/ProjectTile";

export default function Projects() {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <div className="grid grid-cols-4 gap-4">
          <AddProjectTile />
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
      </div>
    </div>
  );
}
