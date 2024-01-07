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
  const [activeTask, setActiveTask] = useState(null);
  const [taskArr, setTaskArr] = useState(
    projMgr.getActiveTasks(cardData.parentIdx, cardData.idx)
  );

  useEffect(() => {
    if (!activeTask && taskArr && taskArr.length > 0) {
      setActiveTask(taskArr[0]);
    }
  }, []);

  function refreshTaskList() {
    let tasks = projMgr.getActiveTasks(cardData.parentIdx, cardData.idx);
    if (!tasks.length)
      throw new Error(
        "[CardForm.js] Tasks array should never be empty! Should have 'General'"
      );
    setTaskArr(tasks);
    refresh();
  }

  function toggleTask(taskIdx, isComplete) {
    projMgr.toggleTask(
      activeProject.id,
      activeBoard.id,
      cardData.parentIdx,
      cardData.idx,
      taskIdx,
      isComplete
    );
    refreshTaskList();
  }

  function updateTaskDocHtml(taskIdx, docHtml) {
    projMgr.updateTaskInfo(
      activeProject.id,
      activeBoard.id,
      cardData.parentIdx,
      cardData.idx,
      taskIdx,
      docHtml
    );
    refreshTaskList();
  }

  function deleteTask(taskIdx) {
    if (taskArr.length <= 1) return;
    projMgr.removeTask(
      activeProject.id,
      activeBoard.id,
      cardData.parentIdx,
      cardData.idx,
      taskIdx
    );
    setActiveTask(null);
    refreshTaskList();
  }

  const tasksMarkup = taskArr.map((task) => {
    return (
      <Task
        key={task.id}
        cardData={cardData}
        taskData={task}
        toggleTask={toggleTask}
        activeTask={activeTask}
        setActiveTask={setActiveTask}
      />
    );
  });

  function closeCardForm() {
    refresh();
    setShowCardForm(false);
  }

  let percentComplete = Math.round(
    (taskArr.filter((task) => task.complete).length / taskArr.length) * 100
  );

  return (
    <div className="CardForm-background">
      <div className="CardForm appearAnimation">
        <div className="CardForm-topPanel">
          <div className="CardForm-topPanelLeft">
            <h2>{cardData.title}</h2>
            <button className="CardForm-trashIcon">
              <FontAwesomeIcon icon="fa-solid fa-trash-can" />
            </button>
          </div>
          <div className="CardForm-topPanelRight">
            <button onClick={closeCardForm}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </button>
          </div>
        </div>
        <div className="CardForm-bodyPanels">
          <div className="CardForm-leftPanel">
            <div className="CardForm-leftPanelHeader">
              <div className="CardForm-progressInfo">
                <div className="CardForm-progressBar">
                  <div
                    className="CardForm-progress"
                    style={{ width: `${percentComplete}%` }}
                  ></div>
                  <p>{percentComplete}% Complete</p>
                </div>
              </div>
            </div>
            <div className="CardForm-tasks">
              {tasksMarkup}
              <TaskAdd cardData={cardData} refreshTaskList={refreshTaskList} />
            </div>
          </div>
          <div className="CardForm-rightPanel">
            {activeTask && activeTask.docHtml && (
              <BlockEditor
                taskIdx={activeTask.idx}
                content={activeTask.docHtml}
                updateTaskDocHtml={updateTaskDocHtml}
                deleteTask={deleteTask}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
