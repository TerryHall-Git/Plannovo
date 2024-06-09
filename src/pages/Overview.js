import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "../styles/Overview.css";

/**
 * Container details - Calculates the totals associates with each container
 */
function ContainerDetails({ container }) {
  let numCards = container.cards.length;
  let numTasks = 0;
  let numTasksCompleted = 0;
  let numCardsCompleted = 0;

  //Get a count of cards, tasks, and completed tasks
  if (container.cards.length > 0) {
    container.cards.forEach((card) => {
      let taskCount = card.tasks.length;
      let completedCount = card.tasks.filter((task) => task.complete).length;
      numTasks += taskCount;
      numTasksCompleted += completedCount;
      if (taskCount === completedCount) numCardsCompleted++;
    });
  }

  //Percent of completed tasks
  let percentComplete =
    numTasks > 0 ? Math.round((numTasksCompleted / numTasks) * 100) : 100;
  let remPercent = 100 - percentComplete;

  //Progress bar color based on completed percent
  const percentStyle = {
    backgroundColor: `rgb(${remPercent}%, ${percentComplete}%, 0%)`,
    width: `${percentComplete}%`,
  };

  return (
    <div className="Overview-containerDetails">
      <p>
        <b>{container.title}</b>: Cards: {numCardsCompleted}/{numCards}{" "}
        completed | Tasks: {numTasksCompleted}/{numTasks} completed
      </p>
      <div className="Overview-progressBackground">
        <div className="Overview-progress" style={percentStyle}></div>
      </div>
    </div>
  );
}

/**
 * Board details - List each container associated with this board
 */
function BoardDetails({ board }) {
  const containersMarkup = board.containers.map((container) => {
    return <ContainerDetails key={container.id} container={container} />;
  });

  return (
    <div className="Overview-boardDetails">
      <h1>Board [{board.title}]:</h1>
      {containersMarkup}
    </div>
  );
}

/**
 * Overview page - details for every board of the selected project
 */
export default function Overview() {
  const { projMgr } = useContext(ProjectContext);
  const [download, setDownload] = useState("");
  let allBoards = projMgr.getActiveProjBoards();

  useEffect(() => {
    const dataFile = new Blob([JSON.stringify(projMgr.getRootData())], {
      type: "text/plain",
    });
    setDownload(URL.createObjectURL(dataFile));
  }, []);

  if (!allBoards) return;

  const boardDetailsMarkup = Object.keys(allBoards).map((boardId) => {
    return <BoardDetails key={boardId} board={allBoards[boardId]} />;
  });

  let handleChange = async (e) => {
    //function handleChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const rootData = JSON.parse(e.target.result);

      projMgr.saveRootData(rootData);
      alert("Projects uploaded");
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <div className="Overview">
      <div className="Overview-content">
        <div className="Overview-downloadUpload">
          <a href={download} download="plannovoProjects.txt">
            <FontAwesomeIcon icon="fa-solid fa-download" />
          </a>

          <form>
            <label htmlFor="file-upload">
              <FontAwesomeIcon icon="fa-solid fa-upload" />
              <input type="file" id="file-upload" onChange={handleChange} />
            </label>
          </form>
        </div>

        {boardDetailsMarkup}
      </div>
    </div>
  );
}
