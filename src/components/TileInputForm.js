import { useState } from "react";
import "../styles/Animation.css";
import "../styles/TileInputForm.css";

/**
 * This component is used to display the input form for adding a new tile
 */
export default function TileInputForm({
  title,
  createProject,
  setFormShowing,
}) {
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
    <div className="TileInputForm appearAnimation">
      <div className="TileInputForm-header">
        <p>{title}</p>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className="TileInputForm-inputs">
          <label htmlFor="projectName">
            Title:
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
            Description:
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
        <div className="TileInputForm-footer">
          <input
            className="TileInputForm-submitBtn"
            type="submit"
            value="Submit"
          />
          <button className="TileInputForm-cancelBtn" onClick={onCancelHandler}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
