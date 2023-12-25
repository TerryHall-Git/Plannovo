import "../styles/Animation.css";
import "../styles/Tile.css";

/**
 *
 * @param {function} param0
 * @returns
 */
export default function AddProjectTile({ action }) {
  return (
    <div
      className="Tile Tile-inactive appearAnimation enlargeOnHover"
      onClick={action}
    >
      <div className="Tile-add">
        <p>+</p>
      </div>
    </div>
  );
}
