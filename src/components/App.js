import React from "react";
import {useState, useEffect} from "react";

import Header from "../components/Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isAddImagePopupOpen, setIsAddImagePopupOpen] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  //const [isFullImagePopupOpen, setIsFullImagePopupOpen] = useState(false)

  const [selectedCard, setSelectedCard] = useState(null)

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleEditProfileClick = () => {
    setIsProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddImagePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsAvatarPopupOpen(true);
  };

  function closeAllPopups() {
    setSelectedCard(null)
    //setIsFullImagePopupOpen(false)
    setIsProfilePopupOpen(false);
    setIsAddImagePopupOpen(false);
    setIsAvatarPopupOpen(false);
  }

  return (
    <>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <ImagePopup
        card={selectedCard}
        //isOpen={isFullImagePopupOpen}
        onClose={closeAllPopups}
        //onClick={handleCardClick}
        
      />

      <PopupWithForm
        name="profile"
        title="Редактировать профиль"
        isOpen={isProfilePopupOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить"
      >
        {
          <>
            <input className="popup__input" id="profile-name" name="name" type="text" placeholder="Имя" required minLength="2" maxLength="40" />
            <span className="popup__input-span popup__input-span_error" id="profile-name_error">{" "}</span>
            <input className="popup__input" id="profile-description" name="description" type="text" placeholder="О себе" required minLength="2" maxLength="200" />
            <span className="popup__input-span popup__input-span_error" id="profile-description_error">{" "}</span>
          </>
        }
      </PopupWithForm>

      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={isAvatarPopupOpen}
        onClose={closeAllPopups}
        buttonText="Сохранить"
      >
        {
          <>
            <input className="popup__input" id="avatar_input" name="avatar" type="url" placeholder="Ссылка на изображение" required />
            <span className="popup__input-span popup__input-span_error" id="avatar_input_error">{" "}</span>
          </>
        }
      </PopupWithForm>

      <PopupWithForm
        name="addimage"
        title="Новое место"
        isOpen={isAddImagePopupOpen}
        onClose={closeAllPopups}
        buttonText="Создать"
      >
        {
          <>
            <input className="popup__input" id="image-name" name="name" type="text" placeholder="Название" required minLength="2" maxLength="30" />
            <span className="popup__input-span popup__input-span_error" id="image-name_error">{" "}</span>
            <input className="popup__input" id="image-link" name="link" type="url" placeholder="Ссылка на картинку" required />
            <span className="popup__input-span popup__input-span_error" id="image-link_error">{" "}</span>
          </>
        }
      </PopupWithForm>

      <PopupWithForm
        name="delete"
        title="Вы уверены?"
        onClose={closeAllPopups}
        buttonText="Да"
      >
        {}
      </PopupWithForm>
    </>
  );
}

export default App;
