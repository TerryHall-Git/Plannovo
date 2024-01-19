import { useContext, useEffect, useState } from "react";
import { ProjectContext } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Task from "./Task";
import TaskAdd from "./TaskAdd";
import BlockEditor from "./BlockEditor";
import "../styles/Animation.css";
import "../styles/TaskList.css";

/**
 * This component is used to display a list of editable tasks
 */
export default function TaskList({ cardData, setShowTaskList, refresh }) {
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
      throw new Error("[TaskList.js] Tasks array should never be empty!");
    setTaskArr(tasks);
    refresh();
  }

  function setTaskStatus(taskIdx, isComplete) {
    projMgr.setTaskStatus(
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

  function deleteCard() {
    projMgr.removeCard(
      activeProject.id,
      activeBoard.id,
      cardData.parentIdx,
      cardData.idx
    );
    closeTaskList();
  }

  function setTask(taskData) {
    setActiveTask(taskData);
    refreshTaskList();
  }

  const tasksMarkup = taskArr.map((task) => {
    return (
      <Task
        key={task.id}
        cardData={cardData}
        taskData={task}
        setTaskStatus={setTaskStatus}
        activeTask={activeTask}
        setTask={setTask}
        refresh={refresh}
      />
    );
  });

  function closeTaskList() {
    refresh();
    setShowTaskList(false);
  }

  let percentComplete = Math.round(
    (taskArr.filter((task) => task.complete).length / taskArr.length) * 100
  );

  return (
    <div className="TaskList-background">
      <div className="TaskList appearAnimation">
        <div className="TaskList-topPanel">
          <div className="TaskList-topPanelLeft">
            <h2>{cardData.title}</h2>
            <button className="TaskList-trashIcon" onClick={deleteCard}>
              <FontAwesomeIcon icon="fa-solid fa-trash-can" />
            </button>
          </div>
          <div className="TaskList-topPanelRight">
            <button onClick={closeTaskList}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </button>
          </div>
        </div>
        <div className="TaskList-bodyPanels">
          <div className="TaskList-leftPanel">
            <div className="TaskList-leftPanelHeader">
              <div className="TaskList-progressInfo">
                <div className="TaskList-progressBar">
                  <div
                    className="TaskList-progress"
                    style={{ width: `${percentComplete}%` }}
                  ></div>
                  <p>{percentComplete}% Complete</p>
                </div>
              </div>
            </div>
            <div className="TaskList-tasks">
              {tasksMarkup}
              <TaskAdd cardData={cardData} refreshTaskList={refreshTaskList} />
            </div>
          </div>
          <div className="TaskList-rightPanel">
            {activeTask && activeTask.docHtml && (
              <BlockEditor
                taskData={activeTask}
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
