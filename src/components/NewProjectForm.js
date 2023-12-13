import { useState } from "react";
import "../styles/Animation.css";
import "../styles/NewProjectForm.css";

export default function NewProjectForm() {
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

  return (
    <div className="NewProjectForm appearAnimation">
      <div className="NewProjectForm-header">
        <p>Create New Project</p>
      </div>
      <form>
        <div className="NewProjectForm-inputs">
          <label for="projectName">Project Name:</label>
          <input
            name="projectName"
            type="text"
            value={formData.projectName}
            onChange={onChangeHandler}
          />
          <label for="projectName">Project Description:</label>
          <textarea
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
