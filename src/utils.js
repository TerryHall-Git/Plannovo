import { v4 as uuidv4 } from 'uuid';

const SITE_KEY = "DEEP_THOUGHTS";
/**
 * Creates a new Project.
 * @param {string} name 
 * @param {string} desc 
 */
function createNewProject(name, desc) {
    const rootData = getRootData();

    rootData.projects = {
        ...rootData.projects,
        [uuidv4()]: {name: name, desc: desc}
    };

    saveRootData(rootData);
}

function removeProject(key) {
    const rootData = getRootData();

    delete rootData.projects[key];

    saveRootData(rootData);
}

function getProjects() {
    return getRootData().projects;
}

function saveRootData(data) {
    localStorage.setItem(SITE_KEY, JSON.stringify(data));
}

function getRootData() {
    const data = JSON.parse(localStorage.getItem(SITE_KEY));
    return (data) ? data : {projects:{}};
}

export {createNewProject, getProjects, removeProject};

