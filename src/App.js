import { createContext, useEffect, useState } from "react";
import RouteList from "./RouteList";
import "./styles/App.css";
import ProjectManager from "./utils";

const ProjectContext = createContext(undefined);

function App() {
  const projMgr = new ProjectManager();
  const [activeProject, setActiveProject] = useState(
    projMgr.getActiveProject()
  );

  return (
    <div className="App">
      <ProjectContext.Provider
        value={[activeProject, setActiveProject, new ProjectManager()]}
      >
        <RouteList />
      </ProjectContext.Provider>
    </div>
  );
}

export { App as default, ProjectContext };
