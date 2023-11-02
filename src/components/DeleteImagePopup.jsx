import {React, useState} from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteImagePopup({isOpen, onClose, onCardDelete, card}) {
  //console.log(card)

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleDeleteClick}
      buttonText="Да"
    />
  );
}
