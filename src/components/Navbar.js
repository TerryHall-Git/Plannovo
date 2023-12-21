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

  const navDeselected =
    "flex items-center px-6 py-2 mt-2 text-highlight3 hover:bg-secondary hover:bg-opacity-25 hover:text-white";
  const navSelected =
    "flex items-center px-6 py-2 mt-2 text-white bg-opacity-25 bg-highlight1";

  function homeClickHandler() {
    setSelection("");
    navigate("/");
  }

  return (
    <>
      <div className="Navbar-header" onClick={homeClickHandler}>
        <div className="p-3 inline-block w-16">
          <DeepThoughtsIcon />
        </div>
        <div className="p-3 inline-block w-60 text-2xl mt-1">
          <span>Deep Thoughts</span>
        </div>
      </div>
      <div className="absolute top-16 left-0 w-72 m-0 bg-primary border-r-4 border-secondary min-h-full">
        <nav className="mt-0 p-0 h-full">
          <Link
            to="/projects"
            name="projects"
            className={selection === "projects" ? navSelected : navDeselected}
            onClick={(e) => setSelection(e.target.closest("a").name)}
          >
            <ProjectsIcon />
            <span className="mx-3">Projects</span>
          </Link>

          <Link
            to="/overview"
            name="overview"
            className={selection === "overview" ? navSelected : navDeselected}
            onClick={(e) => setSelection(e.target.closest("a").name)}
          >
            <OverviewIcon />
            <span className="mx-3">Overview</span>
          </Link>

          <Link
            to="/boards"
            name="boards"
            className={selection === "boards" ? navSelected : navDeselected}
            onClick={(e) => setSelection(e.target.closest("a").name)}
          >
            <BoardsIcon />
            <span className="mx-3">Boards</span>
          </Link>

          <Link
            to="/tasks"
            name="tasks"
            className={selection === "tasks" ? navSelected : navDeselected}
            onClick={(e) => setSelection(e.target.closest("a").name)}
          >
            <TasksIcon />
            <span className="mx-3">Tasks</span>
          </Link>

          <Link
            to="/admin"
            name="admin"
            className={selection === "admin" ? navSelected : navDeselected}
            onClick={(e) => setSelection(e.target.closest("a").name)}
          >
            <AdministrationIcon />
            <span className="mx-3">Administration</span>
          </Link>
        </nav>
      </div>
    </>
  );
}
