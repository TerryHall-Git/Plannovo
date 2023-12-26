import { ReactComponent as TasksIcon } from "../assets/TasksIcon.svg";
import { ReactComponent as BoardsIcon } from "../assets/BoardsIcon.svg";
import { ReactComponent as ProjectsIcon } from "../assets/ProjectsIcon.svg";
import { ReactComponent as OverviewIcon } from "../assets/OverviewIcon.svg";
import { ReactComponent as SettingsIcon } from "../assets/SettingsIcon.svg";
import { ReactComponent as DeepThoughtsIcon } from "../assets/DeepThoughtsIcon.svg";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProjectContext } from "../App";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const { activeProject, activeBoard } = useContext(ProjectContext);

  const [navLinks, setNavLinks] = useState([
    { linkName: "overview", cls: "Navbar-deselected", icon: <OverviewIcon /> },
    { linkName: "projects", cls: "Navbar-deselected", icon: <ProjectsIcon /> },
    { linkName: "boards", cls: "Navbar-deselected", icon: <BoardsIcon /> },
    { linkName: "tasks", cls: "Navbar-deselected", icon: <TasksIcon /> },
    {
      linkName: "settings",
      cls: "Navbar-deselected",
      icon: <SettingsIcon />,
    },
  ]);

  function homeClickHandler() {
    navigate("/");
  }

  //update link status on click
  function onClickHandler(e) {
    let elName = e.target.closest("a").name;
    let updatedLinks = [...navLinks];
    updatedLinks.forEach((navLink) => {
      navLink.cls =
        navLink.linkName === elName ? "Navbar-selected" : "Navbar-deselected";
    });
    setNavLinks(updatedLinks);
  }

  let projTitle =
    activeProject !== undefined
      ? `Active Project: ${activeProject.title}`
      : "[No Project Selected]";
  let boardTitle =
    activeBoard !== undefined
      ? `Active Board: ${activeBoard.title}`
      : "[No Board Selected]";

  //create nav links
  let navLinkMarkup = navLinks.map(({ linkName, cls, icon }) => {
    return (
      <Link
        key={linkName}
        to={`/${linkName}`}
        name={linkName}
        className={cls}
        onClick={onClickHandler}
      >
        {icon}
        <span className="Navbar-icon">
          {linkName.charAt(0).toUpperCase() + linkName.slice(1)}
        </span>
      </Link>
    );
  });

  return (
    <div>
      <div className="Navbar-top" onClick={homeClickHandler}>
        <div className="Navbar-home">
          <DeepThoughtsIcon />
          <span>Deep Thoughts</span>
        </div>
        <div className="Navbar-projName">
          <h3>{projTitle + " - " + boardTitle}</h3>
        </div>
      </div>
      <div className="Navbar-left">
        <nav>{navLinkMarkup}</nav>
      </div>
    </div>
  );
}
