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
      [uuid]: { title: title, desc: desc, boards: {} },
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
      [uuid]: { title: title, desc: desc, containers: [] },
    };

    this.saveRootData(rootData);
  }

  createNewContainer(projId, boardId, title) {
    const rootData = this.getRootData();

    if (!this.boardExists(projId, boardId)) return;

    const containers = rootData.projects[projId].boards[boardId].containers;

    let uuid = uuidv4();
    containers.push({
      id: uuid,
      idx: containers.length,
      title: title,
      cards: [],
    });

    this.saveRootData(rootData);
  }

  createNewCard(projId, boardId, containerIdx, title, desc) {
    const rootData = this.getRootData();

    if (!this.boardExists(projId, boardId)) return;

    const container =
      rootData.projects[projId].boards[boardId].containers[containerIdx];

    let uuid = uuidv4();
    container.cards.push({
      id: uuid,
      idx: container.cards.length,
      title: title,
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

  getActiveProject() {
    let rootData = this.getRootData();
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
    return rootData.projects[rootData.activeProjectId].boards[
      rootData.activeBoardId
    ];
  }

  getActiveBoardId() {
    return this.getRootData().activeBoardId;
  }

  getBoard(projId, boardId) {
    let rootData = this.getRootData();
    if (!this.boardExists(projId, boardId)) return;
    return rootData.projects[projId].boards[boardId];
  }

  getBoards() {
    if (this.getActiveProject() === undefined) return undefined;
    return this.getActiveProject().boards;
  }

  setActiveProject(id) {
    const rootData = this.getRootData();

    rootData.activeProjectId = id;

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
          activeBoardId: undefined,
          projects: {},
        };
  }
}

export default ProjectManager;
