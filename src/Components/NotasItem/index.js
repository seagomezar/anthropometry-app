import React from "react";
import './NotasItem.css'

function NotasItem(props) {
  return (
    <li className="NotasItem">
      <span
      className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
      onClick={props.onComplete}
      >
        √
      </span>
      <p className={`NotasItem-p ${props.completed && 'NotasItem-p--completed'}`}>
        {props.text}
      </p>
      <span 
      className="Icon Icon-delete"
      onClick={props.onDelete}
      >
        X
      </span>
    </li>
  );
}

export { NotasItem };