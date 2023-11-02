import {React, useState} from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteImagePopup(props) {

  //console.log(props)

  /* function handleDeleteClick() {
    props.onCardDelete(props.card);
  } */

  return (
    <PopupWithForm 
      name="delete" 
      title="Вы уверены?" 
      isOpen={props.isOpen} 
      onClose={props.onClose} 
      //onSubmit={handleDeleteClick} 
      buttonText="Да"
    />
  );
}
