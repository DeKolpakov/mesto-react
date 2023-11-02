import {React, useState, useEffect, useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {
  const userContext = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__avatar-image" id="avatar-image" src={userContext.avatar} alt="Аватар" />
          <div className="profile__avatar-overlay">
            <button className="profile__avatar-icon" type="button" onClick={props.onEditAvatar} aria-label="сменить аватар"></button>
          </div>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{userContext.name}</h1>
          <button className="profile__button-edit profile__button-open" type="button" onClick={props.onEditProfile} aria-label="изменить профиль"></button>
          <p className="profile__description">{userContext.about}</p>
        </div>
        <button className="profile__button-add" type="button" onClick={props.onAddPlace} aria-label="добавить фото"></button>
      </section>

      <section className="galery">
        {props.cards.map((card) => (
          <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
        ))}
      </section>
    </main>
  );
}

export default Main;
