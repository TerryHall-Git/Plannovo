import { useState } from "react";
import "../styles/Animation.css";

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
    <div className="flex flex-col w-128 h-96 border-4 p-4 rounded-2xl border-highlight2 bg-secondary appearAnimation drop-shadow-xl">
      <p className="text-2xl text-center mb-3">Create New Project</p>
      <form className=" text-lg p-4">
        <div className="text-left grid row-span-2 col-span-2">
          <label className="p-1 pr-6" for="projectName">
            Project Name:
          </label>
          <input
            className="p-1 text-primary"
            name="projectName"
            type="text"
            value={formData.projectName}
            onChange={onChangeHandler}
          />
          <label className="p-1 pr-6 pt-6" for="projectName">
            Project Description:
          </label>
          <textarea
            className="p-1 text-primary"
            name="projectDesc"
            type="text"
            value={formData.projectDesc}
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex flex-col items-center">
          <input
            className="w-48 p-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
}
