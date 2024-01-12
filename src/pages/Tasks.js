import Board from "../components/Board";
import "../styles/Tasks.css";

/**
 * This page displays the active board
 */
export default function Tasks() {
  return (
    <div className="Tasks">
      <div className="Tasks-content">
        <Board />
      </div>
    </div>
  );
}
