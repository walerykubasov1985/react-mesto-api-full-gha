import React, { useContext } from "react";

import Card from "./Card";
import CurrentUserContext from "../context/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-btn" onClick={onEditAvatar}>
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватарка"
          />
        </button>
        <div className="profile__info">
          <h1 className="profile__author">{currentUser.name}</h1>
          <button
            className="profile__author-btn"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="profile__author-subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="images" aria-label="Карточки с фотографиями мест">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
