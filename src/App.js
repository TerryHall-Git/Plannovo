import { createContext } from "react";
import RouteList from "./RouteList";
import "./styles/App.css";

const ProjectContext = createContext(undefined);

function App() {

  //Get active project id


  return (
    <div className="App">
      <ProjectContext.Provider value={undefined}>
        <RouteList />
      </ProjectContext.Provider>
    </div>
  );
}

export default App;
