import "../styles/Animation.css";
import "../styles/Tile.css";

/**
 * This comoponent displays a tile that triggers a callback action when clicked
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
