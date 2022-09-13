import React from "react";
import "./Input.css";

function Input(props) {
  let inputElement;

  // Le type de notre élément Input
  switch (props.type) {
    case "input":
      inputElement = (
        <input
          {...props.config}
          value={props.value}
          className="input-title"
          onChange={props.changed}
        />
      );
      break;
    case "inputFile":
      inputElement = (
        <input
          {...props.config}
          className="input-file"
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          {...props.config}
          value={props.value}
          className="input-description"
          onChange={props.changed}
        />
      );
      break;
    case "img":
      inputElement = (
        <img
          {...props.config}
          src={props.value}
          className="input-image"
          onClick={props.clicked}
        />
      );
      break;
    default:
      break;
  }
  return(
    <>
      { !props.isValid ? <span> { props.errorMessage } </span> : null }
      {inputElement}
    </>
  )
}

export default Input;
