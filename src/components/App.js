import {React, useState, useEffect} from "react";

import Header from "../components/Header";
import Main from "./Main";
import Footer from "./Footer";

import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup"
import DeleteImagePopup from "./DeleteImagePopup";

import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddImagePopupOpen, setIsAddImagePopupOpen] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  //const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getProfileInfo()
      .then((res) => {
        //console.log(res)
        setCurrentUser(res)
      })
      .catch((err) => {
        console.log(`Ошибка получения данных профиля: ${err}`);
      })
  }, [])

  useEffect(() => {
    api.getCards()
      .then((res) => {
        //console.log(res)
        setCards(res)
      })
      .catch((err) => {
        console.log(`Ошибка получения карточек: ${err}`);
      }) 
  }, [])


  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddImagePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsAvatarPopupOpen(true);
  };

  function closeAllPopups() {
    setSelectedCard(null)
    setIsEditProfilePopupOpen(false);
    setIsAddImagePopupOpen(false);
    setIsAvatarPopupOpen(false);
    //setIsDeletePopupOpen(false)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((item) => item._id === card._id ? newCard : item));
      })
      .catch((error) => {
        console.error("Ошибка добавления лайка: ", error);
      })
  }

  function handleCardDelete(card) {
    api.delCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((error) => {
        console.error("Ошибка удаления карточки: ", error);
      })
  }

  function handleUpdateUser(userData) {
    //console.log(userData)
    api.editUserInfo(userData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        //console.log(newUserData)
        closeAllPopups();
      })
      .catch((error) => {
        console.error("Ошибка обнавления данных профиля:", error);
      });
  }

  function handleUpdateAvatar(data) {
    //console.log(data)
    api.editAvatar(data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        //console.log(newUserData)
        closeAllPopups();
      })
      .catch((error) => {
        console.error("Ошибка обнавления аватара:", error);
      });
  }

  function handleAddPlaceSubmit(data) {
    api.postCard(data)
      .then((res) => {
        //console.log(res)
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка добавления карточки: ${err}`);
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        cards = {cards}
        
      />

      <Footer />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 

      <EditAvatarPopup  isOpen={isAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <AddPlacePopup  isOpen={isAddImagePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

      {/* <DeleteImagePopup
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
        cards = {cards}
      /> */}

    </CurrentUserContext.Provider>
  );
}

export default App;
