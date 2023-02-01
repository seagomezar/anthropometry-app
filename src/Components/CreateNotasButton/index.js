import React from "react";
import './CreateNotasButton.css';


function CreateNotasButton(props) {
  const onClickButton = () => {
    props.setOpenModal(prevState => !prevState);
  };
  
  return (
        <button
          className="CreateNotasButton"
          onClick={onClickButton}
        >
          +
        </button>
  );
};
export { CreateNotasButton}