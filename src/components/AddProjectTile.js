import "../styles/Animation.css";
import "../styles/ProjectTile.css";

export default function AddProjectTile({ showForm }) {
  return (
    <div
      className="ProjectTile appearAnimation enlargeOnHover"
      onClick={showForm}
    >
      <div className="ProjectTile-add">
        <p>+</p>
      </div>
    </div>
  );
}
