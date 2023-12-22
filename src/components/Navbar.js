import { ReactComponent as TasksIcon } from "../assets/TasksIcon.svg";
import { ReactComponent as BoardsIcon } from "../assets/BoardsIcon.svg";
import { ReactComponent as ProjectsIcon } from "../assets/ProjectsIcon.svg";
import { ReactComponent as OverviewIcon } from "../assets/OverviewIcon.svg";
import { ReactComponent as AdministrationIcon } from "../assets/AdministrationIcon.svg";
import { ReactComponent as DeepThoughtsIcon } from "../assets/DeepThoughtsIcon.svg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const [selection, setSelection] = useState("");
  const navigate = useNavigate();

  function homeClickHandler() {
    setSelection("");
    navigate("/");
  }

  return (
    <div>
      <div className="Navbar-top" onClick={homeClickHandler}>
        <div className="Navbar-homeIcon">
          <DeepThoughtsIcon />
        </div>
        <div className="Navbar-homeTitle">
          <span>Deep Thoughts</span>
        </div>
      </div>
      <div className="Navbar-left">
        <nav>
          <Link
            to="/projects"
            name="projects"
            className={selection === "projects" ? "Navbar-selected" : "Navbar-deselected"}
            onClick={(e) => setSelection(e.target.closest("a").name)}
          >
            <ProjectsIcon />
            <span className="Navbar-icon">Projects</span>
          </Link>

          <Link
            to="/overview"
            name="overview"
            className={selection === "overview" ? "Navbar-selected" : "Navbar-deselected"}
            onClick={(e) => setSelection(e.target.closest("a").name)}
          >
            <OverviewIcon />
            <span className="Navbar-icon">Overview</span>
          </Link>

          <Link
            to="/boards"
            name="boards"
            className={selection === "boards" ? "Navbar-selected" : "Navbar-deselected"}
            onClick={(e) => setSelection(e.target.closest("a").name)}
          >
            <BoardsIcon />
            <span className="Navbar-icon">Boards</span>
          </Link>

          <Link
            to="/tasks"
            name="tasks"
            className={selection === "tasks" ? "Navbar-selected" : "Navbar-deselected"}
            onClick={(e) => setSelection(e.target.closest("a").name)}
          >
            <TasksIcon />
            <span className="Navbar-icon">Tasks</span>
          </Link>

          <Link
            to="/admin"
            name="admin"
            className={selection === "admin" ? "Navbar-selected" : "Navbar-deselected"}
            onClick={(e) => setSelection(e.target.closest("a").name)}
          >
            <AdministrationIcon />
            <span className="Navbar-icon">Administration</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
