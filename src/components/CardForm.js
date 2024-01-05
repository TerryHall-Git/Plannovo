import { useState } from "react";

import "../styles/Animation.css";
import "../styles/CardForm.css";
import BlockEditor from "./BlockEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CardForm({ cardData, setShowCardForm }) {
  const [formData, setFormData] = useState({
    projectName: "",
    projectDesc: "",
  });
  const [showError, setShowError] = useState(false);

  function onChangeHandler(e) {
    let el = e.target;

    setFormData({
      ...formData,
      [el.name]: el.value,
    });
  }

  function onSubmitHandler(e) {
    e.preventDefault();
  }

  function onCloseHandler(e) {
    setShowCardForm(false);
  }

  return (
    <div className="CardForm-background">
      <div className="CardForm appearAnimation">
        <div className="CardForm-topPanel">
          <button>
            <FontAwesomeIcon icon="fa-regular fa-copy" />
          </button>
          <button onClick={onCloseHandler}>
            <FontAwesomeIcon icon="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="CardForm-bodyPanels">
          <div className="CardForm-leftPanel"></div>
          <div className="CardForm-rightPanel">
            <BlockEditor />
          </div>
        </div>
      </div>
    </div>
  );
}
