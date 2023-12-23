import { useState } from "react";
import "../styles/Animation.css";
import "../styles/NewProjectForm.css";

export default function NewProjectForm({createProject}) {
  const [formData, setFormData] = useState({
    projectName: "",
    projectDesc: "",
  });

  function onChangeHandler(e) {
    let el = e.target;

    //limit text input
    if (el.name === "projectName" && el.value.length > 30)
      el = el.value.substring(0, 30);
    if (el.name === "projectDesc" && el.value.length > 200)
      el = el.value.substring(0, 200);

    setFormData({
      ...formData,
      [el.name]: el.value,
    });
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    createProject(formData.projectName, formData.projectDesc);
  }

  return (
    <div className="NewProjectForm appearAnimation">
      <div className="NewProjectForm-header">
        <p>Create New Project</p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="NewProjectForm-inputs">
          <label htmlFor="projectName">Project Name:</label>
          <input
            id="projectName"
            name="projectName"
            type="text"
            value={formData.projectName}
            onChange={onChangeHandler}
          />
          <label htmlFor="projectName">Project Description:</label>
          <textarea
            id="projectDesc"
            name="projectDesc"
            type="text"
            value={formData.projectDesc}
            onChange={onChangeHandler}
          />
        </div>
        <div className="NewProjectForm-footer">
          <input className="NewProjectForm-btn" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
