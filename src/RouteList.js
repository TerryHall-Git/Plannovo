import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Projects from "./pages/Projects";
import Overview from "./pages/Overview";
import Boards from "./pages/Boards";
import Tasks from "./pages/Tasks";
// import Settings from "./pages/Settings";

export default function RouteList() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/tasks" element={<Tasks />} />
        {/* <Route path="/settings" element={<Settings />} /> */}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
