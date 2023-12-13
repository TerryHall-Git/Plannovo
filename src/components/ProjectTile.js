import "../styles/Animation.css";
import "../styles/ProjectTile.css";

export default function ProjectTile({ projName, projDesc }) {
  return (
    <div className="ProjectTile appearAnimation enlargeOnHover">
      <div className="ProjectTile-header">
        <p>{projName}</p>
      </div>
      <p>{projDesc}</p>
    </div>
  );
}
