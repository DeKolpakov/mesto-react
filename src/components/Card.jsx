function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
    //console.log(props.card)
  }

  return (
    <template className="galery__item">
      <button className="galery__button-delete" type="button" aria-label="удалить"></button>
      <img className="galery__photo" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="galery__card">
        <h2 className="galery__title">{props.card.name}</h2>
        <div className="galery__like">
          <button className="galery__button-like" type="button" aria-label="лайк"></button>
          <span className="galery__total-like" id="total-like">
            {props.card.likes.length}
          </span>
        </div>
      </div>
    </template>
  );
}

export default Card;
