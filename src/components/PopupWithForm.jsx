import React from "react";

function PopupWithForm(props) {
  //console.log(props.buttonText)
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <h2 className="popup__title">{props.title}</h2>
        <button className="popup__button-close" type="button" onClick={props.onClose} aria-label="закрыть окно"></button>

        <form
          className={`popup__form popup__form_type_${props.name}`}
          id={`${props.name}-form`}
          name={`${props.name}-form`}
          noValidate
          method="post"
        >
          {props.children}

          <button
            className={`popup__button-save popup__button-save_type_${props.name} popup__button-save_invalid`}
            id={`submit-button-${props.name}`}
            type="submit"
            aria-label="Подтверждение"
            disabled
          >
          {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
