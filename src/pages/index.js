import "./index.css";
//import {initialCards} from "../utils/initialCard.js";
import {Api} from "../components/Api.js";
import {Card} from "../components/Card.js";
import {FormValidator} from "../components/FormValidator.js";
import {Section} from "../components/Section.js";
import {UserInfo} from "../components/UserInfo.js";

import {PopupWithImage} from "../components/PopupWithImage.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithDelete} from "../components/PopupWIthDelete.js";

import {apiKey} from "../utils/apiKey.js";
import {validationConfig} from "../utils/validationConfig.js";
import {
  nameOutputProfile,
  descriptionOutputProfile,
  buttonEditProfile,
  popupProfile,
  formProfile,
  nameInputPopup,
  descriptionInputPopup,
  popupAddImage,
  formAddImage,
  buttonAddImage,
  galery,
  popupFullImage,
  popupAvatar,
  buttonAvatar,
  popupDeleteCard,
  formAvatar,
  profileAvatar,
} from "../utils/constants.js";

//___API_________________________________________________________________________________

const api = new Api(apiKey);

let userId;

Promise.all([api.getProfileInfo(), api.getCards()])
  .then(([userData, cardData]) => {
    //console.log(userData);
    //console.log(cardData);
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
    userInfo.setUserAvatar({
      avatar: userData.avatar,
    });
    //console.log(renderCard)
    userId = userData._id;
    renderCard.rendererAllCard(cardData);
  })
  .catch((err) => {
    console.log(`Ошибка загрузки данных профиля: ${err}`);
  });

//__EDIT-PROFILE_________________________________________________________________________

const editProfilePopup = new PopupWithForm(popupProfile, {
  callbackSubmitForm: (formData) => {
    //console.log(formData);
    //userInfo.setUserInfo(formData);
    api.editUserInfo({
        name: formData.name,
        description: formData.description,
      })
      .then((res) => {
        //console.log(res)
        userInfo.setUserInfo(formData);
        editProfilePopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка изменения данных профиля: ${err}`);
      })
      .finally(() => {
        editProfilePopup.resetTextButton();
      });
  },
});

//___POPUP-ADD___________________________________________________________________________

const addImagePopup = new PopupWithForm(popupAddImage, {
  callbackSubmitForm: (formData) => {
    //console.log(formData)
    api.postCard({
        name: formData.name,
        link: formData.link,
      })
      .then((res) => {
        renderCard.addItem(
          createNewCard({
            likes: res.likes,
            cardId: res._id,
            name: res.name,
            link: res.link,
            owner: res.owner,
          })
        );
        addImagePopup.close()
      })
      .catch((err) => {
        console.log(`Ошибка добавления фото: ${err}`);
      })
      .finally(() => {
        addImagePopup.resetTextButton();
      });
  },
});

//___POPUP-AVATAR_________________________________________________________________________

const editAvatarPopup = new PopupWithForm(popupAvatar, {
  callbackSubmitForm: (formData) => {
    api.editAvatar(formData)
      .then((res) => {
        //console.log(profileAvatar.src);
        //console.log(res.avatar);
        //profileAvatar.src = res.avatar;
        userInfo.setUserAvatar({
          avatar: res.avatar,
        });
        editAvatarPopup.close();
      })
      .catch((err) => {
        console.log(`Ошибка добавления аватара: ${err}`);
      })
      .finally(() => {
        editAvatarPopup.resetTextButton();
      });
  },
});

//___POPUP-DELETE_________________________________________________________________________

const deleteCardPopup = new PopupWithDelete(popupDeleteCard);

//___POPUP-FULLIMAGE______________________________________________________________________

const popupImage = new PopupWithImage(popupFullImage);

//__PROFILE______________________________________________________________________________

const userInfo = new UserInfo(nameOutputProfile, descriptionOutputProfile, profileAvatar);

//__NEWCARD-CREATE________________________________________________________________________

const createNewCard = (itemCard) => {
  //console.log(itemCard)
  const newCard = new Card(
    itemCard,
    userId, {

      openFullImage: () => {
        popupImage.openPopup(itemCard);
      },

      deleteCard: () => {
        //console.log(itemCard.cardId);
        //console.log(itemCard)
        deleteCardPopup.openPopup();
        deleteCardPopup.setSubmit(() => {
          api.delCard(itemCard.cardId)
            .then(() => {
              newCard.removeCard(itemCard);
              deleteCardPopup.close();
            })
            .catch((err) => {
              console.log(`Ошибка удаления: ${err}`);
            })
            .finally(() => {
              deleteCardPopup.resetTextButton();
            });
        });
      },

      likeCard: () => {
        //console.log(itemCard.cardId)
        if (newCard.isLiked()) {
          api.deleteLike(itemCard.cardId)
            .then((res) => {
              newCard.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(`Ошибка удаления лайка: ${err}`);
            });
        } else {
          api.putLike(itemCard.cardId)
            .then((res) => {
              newCard.setLikes(res.likes);
            })
            .catch((err) => {
              console.log(`Ошибка добавления лайка: ${err}`);
            });
        }
      },
    },
    ".template__galery-item"
  );

  return newCard.createCard();
};

//__INITIALRENDER________________________________________________________________________

const renderCard = new Section({
  //cardList: initialCards,
    renderer: (itemCard) => {
      //console.log(itemCard)
      renderCard.addAllItems(
        createNewCard({
          likes: itemCard.likes,
          cardId: itemCard._id,
          name: itemCard.name,
          link: itemCard.link,
          owner: itemCard.owner,
        })
      );
    },
  },
  galery
);

//renderCard.rendererAllCard();

//__VALIDATION___________________________________________________________________________

const validatorProfileForm = new FormValidator(validationConfig, formProfile);
const validatorAddForm = new FormValidator(validationConfig, formAddImage);
const validatorAvatarForm = new FormValidator(validationConfig, formAvatar);

validatorAddForm.enableValidation();
validatorProfileForm.enableValidation();
validatorAvatarForm.enableValidation();

//__OPENERS_____________________________________________________________________________

const openProfilePopup = () => {
  validatorProfileForm.resetInputs();
  editProfilePopup.openPopup();
  nameInputPopup.value = userInfo.getUserInfo().name;
  descriptionInputPopup.value = userInfo.getUserInfo().description;
  //console.log(userInfo.getUserInfo().description) 
};

const openAddImagePopup = () => {
  validatorAddForm.resetInputs();
  addImagePopup.openPopup();
};

const openAvatarPopup = () => {
  validatorAvatarForm.resetInputs();
  editAvatarPopup.openPopup();
};

//__LISTENERS___________________________________________________________________________

editProfilePopup.setEventListeners();
addImagePopup.setEventListeners();
popupImage.setEventListeners();
editAvatarPopup.setEventListeners();
deleteCardPopup.setEventListeners();

buttonEditProfile.addEventListener("click", openProfilePopup);
buttonAddImage.addEventListener("click", openAddImagePopup);
buttonAvatar.addEventListener("click", openAvatarPopup);
