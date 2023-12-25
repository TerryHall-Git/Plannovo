import { v4 as uuidv4 } from "uuid";

class ProjectManager {
  constructor() {
    this.SITE_KEY = "DEEP_THOUGHTS";
  }
  /**
   * Creates a new Project.
   * @param {string} name
   * @param {string} desc
   */
  createNewProject(name, desc) {
    const rootData = this.getRootData();
    let uuid = uuidv4();
    rootData.projects = {
      ...rootData.projects,
      [uuid]: { name: name, desc: desc },
    };

    rootData.activeProjectId = uuid;

    this.saveRootData(rootData);
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
    return data ? data : { activeProjectId: undefined, projects: {} };
  }
}

export default ProjectManager;
