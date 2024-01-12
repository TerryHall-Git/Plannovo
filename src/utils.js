import { cloneDeep } from "lodash";
import { v4 as uuidv4 } from "uuid";

/**
 * This class is used to store all project data in client-side localStorage.
 * It would be preferable to move this all to a server-side database at
 * some point due to the localStorage limitations.
 */
class ProjectManager {
  constructor() {
    this.SITE_KEY = "DEEP_THOUGHTS";
  }

  /**
   * Creates a new Project.
   * @param {string} title
   * @param {string} desc
   */
  createNewProject(title, desc) {
    const rootData = this.getRootData();
    let uuid = uuidv4();
    rootData.projects = {
      ...rootData.projects,
      [uuid]: {
        id: uuid,
        title: title,
        desc: desc,
        activeBoardId: undefined,
        boards: {},
      },
    };

    rootData.activeProjectId = uuid;

    this.saveRootData(rootData);
  }

  /**
   * Creates a new board under the provided project id
   * @param {string} projId
   * @param {string} title
   * @param {string} desc
   */
  createNewBoard(projId, title, desc) {
    const rootData = this.getRootData();

    if (!this.projectExists(projId)) return;

    let uuid = uuidv4();
    rootData.projects[projId].boards = {
      ...rootData.projects[projId].boards,
      [uuid]: { id: uuid, title: title, desc: desc, containers: [] },
    };

    rootData.projects[projId].activeBoardId = uuid;

    this.saveRootData(rootData);
  }

  /**
   * Creates a new container under the provided project & board id
   * @param {string} projId
   * @param {string} boardId
   * @param {string} title
   */
  createNewContainer(projId, boardId, title) {
    const rootData = this.getRootData();

    if (!this.boardExists(projId, boardId)) {
      console.log(
        "Board not found: projId [" + projId + "] boardId[" + boardId + "]"
      );
      return undefined;
    }

    const containers = rootData.projects[projId].boards[boardId].containers;

    let uuid = uuidv4();
    containers.push({
      id: uuid,
      idx: containers.length,
      title: title,
      type: "container",
      cards: [],
    });

    this.saveRootData(rootData);
  }

  /**
   * Creates a new card under the given project, board, and container
   * @param {string} projId
   * @param {string} boardId
   * @param {number} containerIdx
   * @param {string} title
   * @param {string} desc
   */
  createNewCard(projId, boardId, containerIdx, title, desc) {
    const rootData = this.getRootData();

    if (
      !projId ||
      !boardId ||
      isNaN(containerIdx) ||
      !this.boardExists(projId, boardId)
    ) {
      console.log("Failed to create new card!");
      console.log(projId, boardId, containerIdx);
      return undefined;
    }

    const container =
      rootData.projects[projId].boards[boardId].containers[containerIdx];

    container.cards.push({
      id: uuidv4(),
      parentIdx: container.idx,
      idx: container.cards.length,
      title: title,
      tasks: [
        {
          id: uuidv4(),
          parentIdx: container.cards.length,
          idx: 0,
          title: "General",
          subTasks: [],
          removeable: false,
          complete: false,
          type: "task",
          docHtml: "<p>Enter anything you want...</p>",
        },
      ],
      complete: false,
      type: "card",
      desc: desc,
    });

    this.saveRootData(rootData);
  }

  /**
   * Creates a new task under the given project, board, container, and card
   * @param {string} projId
   * @param {string} boardId
   * @param {number} containerIdx
   * @param {number} cardIdx
   * @param {string} title
   */
  createNewTask(projId, boardId, containerIdx, cardIdx, title) {
    const rootData = this.getRootData();

    if (!projId || !boardId || isNaN(containerIdx) || isNaN(cardIdx)) {
      throw new Error("[utils.js] Failed to create new task!");
    }

    const card =
      rootData.projects[projId].boards[boardId].containers[containerIdx].cards[
        cardIdx
      ];

    card.tasks.push({
      id: uuidv4(),
      parentIdx: card.idx,
      idx: card.tasks.length,
      title: title,
      subTasks: [],
      removeable: true,
      complete: false,
      type: "task",
      docHtml: "<p>Enter anything you want...</p>",
    });

    this.saveRootData(rootData);
  }

  /**
   * Checks if the given project id exists
   * @param {string} id
   * @returns {boolean}
   */
  projectExists(id) {
    const rootData = this.getRootData();
    return rootData.projects[id] !== undefined;
  }

  /**
   * Checks if the given board id exists under the given project
   * @param {string} projId
   * @param {string} boardId
   * @returns {boolean}
   */
  boardExists(projId, boardId) {
    const rootData = this.getRootData();
    if (rootData.projects[projId] === undefined) return false;

    return rootData.projects[projId].boards[boardId] !== undefined;
  }

  /**
   * Removes a given project
   * @param {string} id
   */
  removeProject(id) {
    const rootData = this.getRootData();

    delete rootData.projects[id];

    if (rootData.activeProjectId === id) rootData.activeProjectId = undefined;

    this.saveRootData(rootData);
  }

  /**
   * Removes a given board from a given project
   * @param {string} projId
   * @param {string} boardId
   */
  removeBoard(projId, boardId) {
    const rootData = this.getRootData();

    delete rootData.projects[projId].boards[boardId];

    if (rootData.projects[projId].activeBoardId === boardId)
      rootData.projects[projId].activeBoardId = undefined;

    this.saveRootData(rootData);
  }

  /**
   * Gets the currently active project object
   * @returns {Object}
   */
  getActiveProject() {
    const rootData = this.getRootData();
    return cloneDeep(rootData.projects[rootData.activeProjectId]);
  }

  /**
   * Gets the currently active project id
   * @returns {string}
   */
  getActiveProjectId() {
    return this.getRootData().activeProjectId;
  }

  /**
   * Gets the project object based on a given project id
   * @param {string} id
   * @returns {Object}
   */
  getProject(id) {
    return cloneDeep(this.getRootData().projects[id]);
  }

  /**
   * Gets the full list of all projects
   * @returns {Array}
   */
  getProjects() {
    return cloneDeep(this.getRootData().projects);
  }

  /**
   * Gets the currently active board
   * @returns {Object}
   */
  getActiveBoard() {
    let rootData = this.getRootData();
    if (rootData.activeProjectId === undefined) return undefined;

    return cloneDeep(
      rootData.projects[rootData.activeProjectId].boards[
        rootData.projects[rootData.activeProjectId].activeBoardId
      ]
    );
  }

  /**
   * Gets the currently active board ID
   * @returns {string}
   */
  getActiveBoardId() {
    const activeProject = this.getActiveProject();
    if (activeProject === undefined) return undefined;
    return activeProject.activeBoardId;
  }

  /**
   * Gets a board based on the given project and board id
   * @param {string} projId
   * @param {string} boardId
   * @returns {Object}
   */
  getBoard(projId, boardId) {
    const rootData = this.getRootData();
    if (!this.boardExists(projId, boardId)) return undefined;
    return cloneDeep(rootData.projects[projId].boards[boardId]);
  }

  /**
   * Gets all boards based on a given project id
   * @param {string} projId
   * @returns {Object}
   */
  getBoards(projId) {
    const proj = this.getProject(projId);
    if (proj === undefined) return undefined;
    return cloneDeep(proj.boards);
  }

  /**
   * Gets all boards based on the currently active project
   * @returns {Object}
   */
  getActiveProjBoards() {
    const proj = this.getActiveProject();
    if (proj === undefined) return undefined;
    return cloneDeep(proj.boards);
  }

  /**
   * Get's an active container based on a given container index
   * @param {number} idx
   * @returns {Object}
   */
  getActiveContainer(idx) {
    const activeBoard = this.getActiveBoard();
    if (activeBoard === undefined) return undefined;
    if (idx < 0 || idx > activeBoard.getContainers.length - 1) return undefined;
    return cloneDeep(activeBoard.containers[idx]);
  }

  /**
   * Gets all containers based on the currently active board
   * @returns {Array}
   */
  getActiveContainers() {
    const activeBoard = this.getActiveBoard();
    if (activeBoard === undefined) return [];
    return cloneDeep(activeBoard.containers);
  }

  /**
   * Gets all cards based on an active container index
   * @param {number} containerIdx
   * @returns {Array}
   */
  getActiveCards(containerIdx) {
    const activeBoard = this.getActiveBoard();
    if (!activeBoard) return undefined;
    if (
      !activeBoard.containers ||
      containerIdx < 0 ||
      containerIdx > activeBoard.containers.length
    )
      return undefined;
    const container = activeBoard.containers[containerIdx];
    if (!container || !container.cards) return undefined;
    return cloneDeep(container.cards);
  }

  /**
   * Gets a card based on a given container and card index  (uses active board)
   * @param {number} containerIdx
   * @param {number} cardIdx
   * @returns {Object}
   */
  getActiveCard(containerIdx, cardIdx) {
    const activeCards = this.getActiveCards(containerIdx);
    if (!activeCards || cardIdx > activeCards.length || cardIdx < 0)
      return undefined;
    return cloneDeep(activeCards[cardIdx]);
  }

  /**
   * Gets all tasks based on a given container and card index (uses active board)
   * @param {number} containerIdx
   * @param {number} cardIdx
   * @returns {Array}
   */
  getActiveTasks(containerIdx, cardIdx) {
    const card = this.getActiveCard(containerIdx, cardIdx);
    if (!card) return undefined;
    return cloneDeep(card.tasks);
  }

  /**
   * Gets a task based on the given container, card, and task index (uses active board)
   * @param {*} cardIdx
   * @param {*} taskIdx
   * @returns
   */
  getActiveTask(containerIdx, cardIdx, taskIdx) {
    const card = this.getActiveCard(containerIdx, cardIdx);
    if (card.tasks === undefined) return undefined;
    if (taskIdx > card.tasks.length || taskIdx < 0) return undefined;
    return cloneDeep(card.tasks[taskIdx]);
  }

  /**
   * Sets the active containers
   * @param {Array} containers
   */
  setActiveContainers(containers) {
    let rootData = this.getRootData();
    if (
      rootData.activeProjectId === undefined ||
      rootData.projects[rootData.activeProjectId].activeBoardId === undefined
    )
      throw new Error("[utils.js] Failed to set active containers.");

    let activeBoard =
      rootData.projects[rootData.activeProjectId].boards[
        rootData.projects[rootData.activeProjectId].activeBoardId
      ];

    activeBoard.containers = containers;

    this.saveRootData(rootData);
  }

  /**
   * Sets a project to active based on a given id
   * @param {string} id
   */
  setActiveProject(id) {
    const rootData = this.getRootData();
    rootData.activeProjectId = id;
    this.saveRootData(rootData);
  }

  /**
   * Sets an active board based on a given id
   * @param {string} id
   */
  setActiveBoard(id) {
    let rootData = this.getRootData();
    if (rootData.activeProjectId === undefined) return;
    const activeProject = rootData.projects[rootData.activeProjectId];
    if (activeProject === undefined) return;
    activeProject.activeBoardId = id;
    this.saveRootData(rootData);
  }

  /**
   * Sets the completion status of a task based on index for a given card
   * @param {string} projId
   * @param {string} boardId
   * @param {number} containerIdx
   * @param {number} cardIdx
   * @param {number} taskIdx
   * @param {boolean} isComplete
   */
  setTaskStatus(projId, boardId, containerIdx, cardIdx, taskIdx, isComplete) {
    const rootData = this.getRootData();

    if (
      !projId ||
      !boardId ||
      isNaN(containerIdx) ||
      isNaN(cardIdx) ||
      isNaN(taskIdx)
    ) {
      throw new Error("[utils.js] Failed to toggle task!");
    }

    rootData.projects[projId].boards[boardId].containers[containerIdx].cards[
      cardIdx
    ].tasks[taskIdx].complete = isComplete;

    this.saveRootData(rootData);
  }

  /**
   * Updates the task document information based on a given task index for a card
   * @param {string} projId
   * @param {string} boardId
   * @param {number} containerIdx
   * @param {number} cardIdx
   * @param {number} taskIdx
   * @param {string} docHtml
   */
  updateTaskInfo(projId, boardId, containerIdx, cardIdx, taskIdx, docHtml) {
    const rootData = this.getRootData();

    if (
      !projId ||
      !boardId ||
      isNaN(containerIdx) ||
      isNaN(cardIdx) ||
      isNaN(taskIdx)
    ) {
      throw new Error("[utils.js] Failed to update task docHtml!");
    }

    rootData.projects[projId].boards[boardId].containers[containerIdx].cards[
      cardIdx
    ].tasks[taskIdx].docHtml = docHtml;

    this.saveRootData(rootData);
  }

  /**
   * Removes a task based on index from a given card
   * @param {string} projId
   * @param {string} boardId
   * @param {number} containerIdx
   * @param {number} cardIdx
   * @param {number} taskIdx
   */
  removeTask(projId, boardId, containerIdx, cardIdx, taskIdx) {
    const rootData = this.getRootData();

    if (
      !projId ||
      !boardId ||
      isNaN(containerIdx) ||
      isNaN(cardIdx) ||
      isNaN(taskIdx)
    ) {
      throw new Error("[utils.js] Failed to remove task!");
    }

    let tasks =
      rootData.projects[projId].boards[boardId].containers[containerIdx].cards[
        cardIdx
      ].tasks;

    //remove task from array
    tasks.splice(taskIdx, 1);

    //update index info
    tasks = tasks.map((task, idx) => (task.idx = idx));

    this.saveRootData(rootData);
  }

  /**
   * Saves all data to local storage
   */
  saveRootData(data) {
    window.localStorage.setItem(this.SITE_KEY, JSON.stringify(data));
  }

  /**
   * Gets all data from local storage
   */
  getRootData() {
    const data = JSON.parse(window.localStorage.getItem(this.SITE_KEY));
    return data
      ? data
      : {
          activeProjectId: undefined,
          projects: {},
        };
  }
}

export default ProjectManager;
