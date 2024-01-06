import { useContext, useEffect, useState } from "react";

import "../styles/Animation.css";
import "../styles/CardForm.css";
import BlockEditor from "./BlockEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Task from "./Task";
import { ProjectContext } from "../App";
import TaskAdd from "./TaskAdd";

export default function CardForm({ cardData, setShowCardForm, refresh }) {
  const { activeProject, activeBoard, projMgr } = useContext(ProjectContext);
  const [taskArr, setTaskArr] = useState(
    projMgr.getActiveTasks(cardData.parentIdx, cardData.idx)
  );

  function refreshTaskList() {
    let tasks = projMgr.getActiveTasks(cardData.parentIdx, cardData.idx);
    if (!tasks.length)
      throw new Error(
        "[CardForm.js] Tasks array should never be empty! Should have 'General'"
      );
    setTaskArr(tasks);
    refresh();
  }

  const tasksMarkup = taskArr.map((task) => {
    return (
      <Task
        key={task.id}
        title={task.title}
        complete={task.complete}
        subTasks={task.subTasks}
        removable={task.removable}
        createNewSubTask={createNewSubTask}
        updateTask={updateTask}
      />
    );
  });

  // function createTask(taskTitle) {
  //   console.log("creating new task...");
  //   projMgr.createNewTask(
  //     activeProject.id,
  //     activeBoard.id,
  //     cardData.parentIdx,
  //     cardData.idx,
  //     taskTitle
  //   );
  //   refreshTaskList();
  // }

  function createNewSubTask() {
    // projMgr.createNewTask(cardData.idx);
  }

  function updateTask(taskId) {}

  function closeCardForm() {
    refresh();
    setShowCardForm(false);
  }

  return (
    <div className="CardForm-background">
      <div className="CardForm appearAnimation">
        <div className="CardForm-topPanel">
          <div className="CardForm-topPanelHeader">
            <h2>{cardData.title}</h2>
          </div>
          <div className="CardForm-topPanelBtns">
            <button>
              <FontAwesomeIcon icon="fa-regular fa-copy" />
            </button>
            <button onClick={closeCardForm}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </button>
          </div>
        </div>
        <div className="CardForm-bodyPanels">
          <div className="CardForm-leftPanel">
            {/* <div className="CardForm-addTaskArea"></div> */}
            <div className="CardForm-tasks">
              {tasksMarkup}{" "}
              <TaskAdd cardData={cardData} refreshTaskList={refreshTaskList} />
            </div>
          </div>
          <div className="CardForm-rightPanel">
            <BlockEditor />
          </div>
        </div>
      </div>
    </div>
  );
}
