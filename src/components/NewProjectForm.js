import { useState } from "react";
import "../styles/Animation.css";
import "../styles/NewProjectForm.css";

export default function NewProjectForm({ createProject, setFormShowing }) {
  const [formData, setFormData] = useState({
    projectName: "",
    projectDesc: "",
  });
  const [showError, setShowError] = useState(false);

  function onChangeHandler(e) {
    let el = e.target;

    //limit text input
    if (el.name === "projectName" && el.value.length > 25)
      el = el.value.substring(0, 25);
    if (el.name === "projectDesc" && el.value.length > 125)
      el = el.value.substring(0, 125);

    setFormData({
      ...formData,
      [el.name]: el.value,
    });
  }

  function onSubmitHandler(e) {
    e.preventDefault();
    if (formData.projectName === "" || formData.projectDesc === "") {
      setShowError(true);
      return;
    }
    createProject(formData.projectName, formData.projectDesc);
    setShowError(false);
    setFormShowing(false);
  }

  function onCancelHandler(e) {
    setShowError(false);
    setFormShowing(false);
  }

  return (
    <div className="NewProjectForm appearAnimation">
      <div className="NewProjectForm-header">
        <p>Create New Project</p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="NewProjectForm-inputs">
          <label htmlFor="projectName">
            Project Name:{" "}
            <span>
              {formData.projectName === "" && showError ? "*Required" : ""}
            </span>
          </label>
          <input
            id="projectName"
            name="projectName"
            type="text"
            value={formData.projectName}
            onChange={onChangeHandler}
          />
          <label htmlFor="projectDesc">
            Project Description:{" "}
            <span>
              {formData.projectDesc === "" && showError ? "*Required" : ""}
            </span>
          </label>
          <textarea
            id="projectDesc"
            name="projectDesc"
            type="text"
            value={formData.projectDesc}
            onChange={onChangeHandler}
          />
        </div>
        <div className="NewProjectForm-footer">
          <input
            className="NewProjectForm-submitBtn"
            type="submit"
            value="Submit"
          />
          <button
            className="NewProjectForm-cancelBtn"
            onClick={onCancelHandler}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
