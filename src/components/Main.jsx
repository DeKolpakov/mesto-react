import React, {useState, useEffect} from 'react';
import api from '../utils/api';
import Card from "./Card"

function Main(props) {
  const [userName, setUserName] = useState("")
  const [userDescription, setUserDescription] = useState("")
  const [userAvatar, setUserAvatar] = useState("")
  const [cards, setCards] = useState([])

  useEffect(() => {

    api.getProfileInfo()
    .then((res) => {
      //console.log(res)
      setUserName(res.name)
      setUserDescription(res.about)
      setUserAvatar(res.avatar)
    })
    .catch((err) => {
      console.log(`Ошибка получения данных профиля: ${err}`);
    })

    api.getCards()
    .then((res) => {
      //console.log(res)
      setCards(res)
    })
    .catch((err) => {
      console.log(`Ошибка получения карточек: ${err}`);
    })
    
  }, [])

  return (
    <>
      <main className="main">
        <section className="profile">
          <div className="profile__avatar">
            <img className="profile__avatar-image" id="avatar-image" src={userAvatar} alt="Аватар" />
            <div className="profile__avatar-overlay">
              <button className="profile__avatar-icon" type="button" onClick={props.onEditAvatar} aria-label="сменить аватар"></button>
            </div>
          </div>

          <div className="profile__info">
            <h1 className="profile__name">{userName}</h1>
            <button className="profile__button-edit profile__button-open" type="button" onClick={props.onEditProfile} aria-label="изменить профиль"></button>
            <p className="profile__description">{userDescription}</p>
          </div>
          <button className="profile__button-add" type="button" onClick={props.onAddPlace} aria-label="добавить фото"></button>
        </section>

        <section className="galery">
          {cards.map((card) => (<Card key={card._id} card={card} onCardClick={props.onCardClick} />))}
        </section>

      </main>
    </>
  );
}

export default Main;
