import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {

  const userContext = React.useContext(CurrentUserContext);
  //console.log(userContext)

  function handleClick() {
    props.onCardClick(props.card);
    //console.log(props.card)
  }
//_____________________________________________________________________________________

  const isOwn = props.card.owner._id === userContext._id;

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

//_____________________________________________________________________________________

  const isLiked = props.card.likes.some(i => i._id === userContext._id);

  const cardLikeButtonClassName = ( 
    `galery__button-like ${isLiked && 'galery__button-like_active'}`
  );

  function handleLikeClick() {
    props.onCardLike(props.card)
    //console.log(props.card)
  }

//_____________________________________________________________________________________

  return (
    <template className="galery__item">
      {isOwn && <button className="galery__button-delete" type="button" aria-label="удалить" onClick={handleDeleteClick} />}
      <img className="galery__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="galery__card">
        <h2 className="galery__title">{props.card.name}</h2>
        <div className="galery__like">
          <button className={cardLikeButtonClassName} type="button" aria-label="лайк" onClick={handleLikeClick} ></button>
          <span className="galery__total-like" id="total-like">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </template>
  );
}

export default Card;
