import { useContext, useState } from "react";
import TileAdd from "../components/TileAdd.js";
import Tile from "../components/Tile";
import TileInputForm from "../components/TileInputForm.js";
import { ProjectContext } from "../App.js";
import "../styles/TileGrid.css";

/**
 * This page allows users to create new boards, change the active board,
 * and lists all boards for the active project
 */
export default function Boards() {
  const { activeProject, setActiveBoard, projMgr } = useContext(ProjectContext);
  const [formShowing, setFormShowing] = useState(false);
  const [boards, setBoards] = useState(projMgr.getBoards(activeProject?.id));

  //Event listener: create new board
  function tileCreated(name, desc) {
    projMgr.createNewBoard(activeProject.id, name, desc);
    setBoards(projMgr.getBoards(activeProject.id));
    setActiveBoard(projMgr.getActiveBoard());
  }

  //Event listener: activate board
  function tileActivated({ boardId }) {
    projMgr.setActiveBoard(boardId);
    setActiveBoard(projMgr.getActiveBoard());
  }

  //Event listener: delete board
  function tileDeleted({ boardId, confirmDelete }) {
    if (confirmDelete) {
      projMgr.removeBoard(activeProject.id, boardId);
      setBoards(projMgr.getBoards(activeProject.id));
      setActiveBoard(projMgr.getActiveBoard());
    }
  }

  let activeBoardId = projMgr.getActiveBoardId();

  return (
    <div className="TileGrid">
      {activeProject ? (
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
