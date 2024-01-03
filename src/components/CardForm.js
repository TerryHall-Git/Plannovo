import { useState } from "react";
import "../styles/Animation.css";
import "../styles/CardForm.css";

export default function CardForm({ cardData }) {
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

  function onCancelHandler(e) {
    // setFormShowing(false);
  }

  return (
    <div className="CardForm-background">
      <div className="CardForm appearAnimation">
        <div className="CardForm-topPanel"></div>
        <div className="CardForm-panels">
          <div className="CardForm-leftPanel">test</div>
          <div className="CardForm-rightPanel">test</div>
        </div>
      </div>
    </div>
  );
}
