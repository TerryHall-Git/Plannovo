import { v4 as uuidv4 } from 'uuid';

const SITE_KEY = "DEEP_THOUGHTS";

function CreateNewProject(name, desc) {
    const rootData = GetRootData();

    rootData["projects"] = {
        ...rootData.projects,
        [uuidv4()]: {name: name, desc: desc}
    };

    SaveRootData(rootData);
}

function SaveRootData(data) {
    localStorage.setItem(SITE_KEY, JSON.stringify(data));
}

function GetRootData() {
    const data = JSON.parse(localStorage.getItem(SITE_KEY));
    return (data) ? data : {};
}

export {CreateNewProject};

