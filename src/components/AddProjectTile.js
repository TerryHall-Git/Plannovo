import "../styles/Animation.css";
import "../styles/ProjectTile.css";

export default function AddProjectTile({ addNewProject }) {
  return (
    <div
      className="ProjectTile appearAnimation enlargeOnHover"
      onClick={addNewProject}
    >
      <div className="ProjectTile-add">
        <p>+</p>
      </div>
    </div>
  );
}
