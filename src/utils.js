import { v4 as uuidv4 } from "uuid";

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

  createNewCard(projId, boardId, containerIdx, title, desc) {
    const rootData = this.getRootData();

    console.log(containerIdx);
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

    let uuid = uuidv4();
    container.cards.push({
      id: uuid,
      parentIdx: container.idx,
      idx: container.cards.length,
      title: title,
      type: "card",
      desc: desc,
    });

    this.saveRootData(rootData);
  }

  projectExists(id) {
    const rootData = this.getRootData();
    return rootData.projects[id] !== undefined;
  }

  boardExists(projId, boardId) {
    const rootData = this.getRootData();
    if (rootData.projects[projId] === undefined) return false;

    return rootData.projects[projId].boards[boardId] !== undefined;
  }

  removeProject(id) {
    const rootData = this.getRootData();

    delete rootData.projects[id];

    if (rootData.activeProjectId === id) rootData.activeProjectId = undefined;

    this.saveRootData(rootData);
  }

  removeBoard(projId, boardId) {
    const rootData = this.getRootData();

    delete rootData.projects[projId].boards[boardId];

    if (rootData.projects[projId].activeBoardId === boardId)
      rootData.projects[projId].activeBoardId = undefined;

    this.saveRootData(rootData);
  }

  getActiveProject() {
    const rootData = this.getRootData();
    return rootData.projects[rootData.activeProjectId];
  }

  getActiveProjectId() {
    return this.getRootData().activeProjectId;
  }

  getProject(id) {
    return this.getRootData().projects[id];
  }

  getProjects() {
    return this.getRootData().projects;
  }

  getActiveBoard() {
    let rootData = this.getRootData();
    if (rootData.activeProjectId === undefined) return undefined;

    return rootData.projects[rootData.activeProjectId].boards[
      rootData.projects[rootData.activeProjectId].activeBoardId
    ];
  }

  getActiveBoardId() {
    const activeProject = this.getActiveProject();
    if (activeProject === undefined) return undefined;
    return activeProject.activeBoardId;
  }

  getBoard(projId, boardId) {
    const rootData = this.getRootData();
    if (!this.boardExists(projId, boardId)) return undefined;
    return rootData.projects[projId].boards[boardId];
  }

  getBoards() {
    if (this.getActiveProject() === undefined) return undefined;
    return this.getActiveProject().boards;
  }

  getActiveContainer(idx) {
    const activeBoard = this.getActiveBoard();
    if (activeBoard === undefined) return undefined;
    if (idx < 0 || idx > activeBoard.getContainers.length - 1) return undefined;
    return activeBoard.containers[idx];
  }

  getActiveContainers() {
    const activeBoard = this.getActiveBoard();
    if (activeBoard === undefined) return [];
    return activeBoard.containers;
  }

  getActiveCards(containerIdx) {
    const activeBoard = this.getActiveBoard();
    if (activeBoard === undefined) return undefined;
    if (containerIdx < 0 || containerIdx > activeBoard.containers.length - 1)
      return undefined;
    return activeBoard.containers[containerIdx].cards;
  }

  setActiveProject(id) {
    const rootData = this.getRootData();
    rootData.activeProjectId = id;
    this.saveRootData(rootData);
  }

  setActiveBoard(id) {
    let rootData = this.getRootData();
    if (rootData.activeProjectId === undefined) return;
    const activeProject = rootData.projects[rootData.activeProjectId];
    if (activeProject === undefined) return;
    activeProject.activeBoardId = id;
    this.saveRootData(rootData);
  }

  saveRootData(data) {
    localStorage.setItem(this.SITE_KEY, JSON.stringify(data));
  }

  getRootData() {
    const data = JSON.parse(localStorage.getItem(this.SITE_KEY));
    return data
      ? data
      : {
          activeProjectId: undefined,
          projects: {},
        };
  }
}

export default ProjectManager;
