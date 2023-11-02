import {React, useEffect, useState, useContext} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  //console.log(props);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const userContext = useContext(CurrentUserContext);

  useEffect(() => {
    //console.log(userContext);
    setName(userContext.name);
    setDescription(userContext.about);
  }, [userContext]);

  function handleChangeName(e) {
    //console.log(e.target.value)
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm name="profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
      <>
        <input
          className="popup__input"
          id="profile-name"
          name="name"
          type="text"
          value={name}
          onChange={handleChangeName}
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="popup__input-span popup__input-span_error" id="profile-name_error">
          {" "}
        </span>
        <input
          className="popup__input"
          id="profile-description"
          name="description"
          type="text"
          value={description}
          onChange={handleChangeDescription}
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__input-span popup__input-span_error" id="profile-description_error">
          {" "}
        </span>
      </>
    </PopupWithForm>
  );
}
