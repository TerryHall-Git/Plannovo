import { useContext } from "react";
import { ProjectContext } from "../App";
import "../styles/Overview.css";

function ContainerDetails({ container }) {
  let numCards = container.cards.length;
  let numTasks = 0;
  let numTasksCompleted = 0;
  let numCardsCompleted = 0;

  if (container.cards.length > 0) {
    container.cards.forEach((card) => {
      console.log(card);
      let taskCount = card.tasks.length;
      let completedCount = card.tasks.filter((task) => task.complete).length;
      numTasks += taskCount;
      numTasksCompleted += completedCount;
      if (taskCount === completedCount) numCardsCompleted++;
    });
  }

  let percentComplete =
    numTasks > 0 ? Math.round((numTasksCompleted / numTasks) * 100) : 100;
  let remPercent = 100 - percentComplete;
  console.log(
    `linear-gradient(to right, red ${remPercent}%, yellow, green ${percentComplete}%)`
  );
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

export default function Overview() {
  const { activeProject, activeBoard, projMgr } = useContext(ProjectContext);

  let allBoards = projMgr.getActiveProjBoards();
  const boardDetailsMarkup = Object.keys(allBoards).map((boardId) => {
    return <BoardDetails key={boardId} board={allBoards[boardId]} />;
  });

  return (
    <div className="Overview">
      <div className="Overview-content">{boardDetailsMarkup}</div>
    </div>
  );
}
