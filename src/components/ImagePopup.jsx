import React from "react";

function ImagePopup({card, onClose}) {
  //console.log(card ? card.link : '')
  //console.log(props.card)
  //console.log(props.onClose)

  return (
    <div className={`popup popup_type_fullimage ${card ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_type_fullimage">
        <button className="popup__button-close popup__button-close_type_fullimage" type="button" aria-label="закрыть окно" onClick={onClose}></button>
        <img className="popup__photo-fullimage" src={card?.link} alt={card?.name} />
        <h2 className="popup__name-fullimage">{card?.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
