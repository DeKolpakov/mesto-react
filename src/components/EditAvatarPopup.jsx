import {React, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
  //console.log(props);

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm name="avatar" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} buttonText="Сохранить" onSubmit={handleSubmit}>
      {
        <>
          <input className="popup__input" id="avatar_input" name="avatar" type="url" ref={avatarRef} placeholder="Ссылка на изображение" required />
          <span className="popup__input-span popup__input-span_error" id="avatar_input_error">
            {" "}
          </span>
        </>
      }
    </PopupWithForm>
  );
}
