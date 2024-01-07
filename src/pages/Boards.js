import { useContext, useState } from "react";
import TileAdd from "../components/TileAdd.js";
import Tile from "../components/Tile";
import TileInputForm from "../components/TileInputForm.js";
import { ProjectContext } from "../App.js";
import "../styles/TileGrid.css";

export default function Boards() {
  const { activeProject, setActiveBoard, projMgr } = useContext(ProjectContext);
  const [formShowing, setFormShowing] = useState(false);
  const [boards, setBoards] = useState(projMgr.getBoards(activeProject.id));

  let tileCreated = (name, desc) => {
    projMgr.createNewBoard(activeProject.id, name, desc);
    setBoards(projMgr.getBoards(activeProject.id));
    setActiveBoard(projMgr.getActiveBoard());
  };

  let tileActivated = ({ boardId }) => {
    projMgr.setActiveBoard(boardId);
    setActiveBoard(projMgr.getActiveBoard());
  };

  let tileDeleted = ({ boardId, confirmDelete }) => {
    if (confirmDelete) {
      projMgr.removeBoard(activeProject.id, boardId);
      setBoards(projMgr.getBoards(activeProject.id));
      setActiveBoard(projMgr.getActiveBoard());
    }
  };

  let activeBoardId = projMgr.getActiveBoardId();

  return (
    <div className="TileGrid">
      {activeProject !== undefined ? (
        <div className="TileGrid-content">
          {formShowing ? (
            <TileInputForm
              title="Create New Board"
              createProject={tileCreated}
              setFormShowing={setFormShowing}
            />
          ) : (
            <div className="TileGrid-grid">
              <TileAdd action={() => setFormShowing(true)} />
              {boards !== undefined
                ? Object.keys(boards).map((boardId) => {
                    const { title, desc } = boards[boardId];
                    console.log(boardId);
                    return (
                      <Tile
                        key={boardId}
                        isActive={activeBoardId === boardId}
                        title={title}
                        desc={desc}
                        tileDeleted={tileDeleted}
                        tileActivated={tileActivated}
                        tileCallbackData={{ boardId }}
                      />
                    );
                  })
                : ""}
            </div>
          )}
        </div>
      ) : (
        <div className="TileGrid-warning">
          <p>No active project. Click on "Projects" to activate one.</p>
        </div>
      )}
    </div>
  );
}
