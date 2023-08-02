import React from "react";
import CurrentUserContext from "../context/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // console.log(card.likes)
  const isOwn = card.owner === currentUser._id;

  const isLiked = card.likes.some(id => id === currentUser._id);

  const cardLikeButtonClassName = ( 
    `image__btn-like ${isLiked && 'image__btn-like_activ'}` 
  );;

  const handleCardClick = () => {
    onCardClick(card);
  };
  const handleLikeClick = () => {
    onCardLike(card)
  };
  
  const handleDeleteClick = () => {
    onCardDelete(card);
  };

  return (
    <article className="image">
      <img
        className="image__photo"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      {isOwn && (
        <button
          className="image__delete"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="image__caption">
        <h2 className="image__title">{card.name}</h2>
        <div className="image__likes">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <span className="image__likes-number">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
