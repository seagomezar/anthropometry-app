import React from "react";
import "./NotasForm.css";

function NotasForm({ addNotas, setOpenModal }) {
  const [newNotasValue, setNewNotasValue] = React.useState("");

  const onChange = (event) => {
    setNewNotasValue(event.target.value);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addNotas(newNotasValue);
    setOpenModal(false);
    setNewNotasValue("");
  };

  return (
    <div className="notas">
      <form onSubmit={onSubmit}>
        <label>Escribe tu nuevas Notas</label>
        <textarea
          value={newNotasValue}
          onChange={onChange}
          placeholder="Cortar la cebolla para el almuerzo"
        />
        <div className="NotasForm-buttonContainer">
          <button
            type="button"
            className="NotasForm-button NotasForm-button--cancel"
            onClick={onCancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="NotasForm-button NotasForm-button--add"
          >
            Añadir
          </button>
        </div>
      </form>
    </div>
  );
}

export { NotasForm };
