import { createContext, useState } from "react";
import RouteList from "./RouteList";
import ProjectManager from "./utils";
import "./styles/App.css";

const ProjectContext = createContext(undefined);

function App() {
  const projMgr = new ProjectManager();
  const [activeProject, setActiveProject] = useState(
    projMgr.getActiveProject()
  );
  const [activeBoard, setActiveBoard] = useState(projMgr.getActiveBoard());

  return (
    <div className="App">
      <ProjectContext.Provider
        value={{
          activeProject: activeProject,
          setActiveProject: setActiveProject,
          activeBoard: activeBoard,
          setActiveBoard: setActiveBoard,
          projMgr: new ProjectManager(),
        }}
      >
        <RouteList />
      </ProjectContext.Provider>
    </div>
  );
}

export { App as default, ProjectContext };
