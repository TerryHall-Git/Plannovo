import "../styles/Animation.css";
import "../styles/Tile.css";

/**
 * Generic tile with an action callback 'onClick'
 * @param {function} param0
 */
export default function TileAdd({ action }) {
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
