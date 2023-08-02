import React from "react";

function ImagePopup({ card, onClose, onFieldClickClose }) {
  return (
    <div
      className={`popup popup_open-photo ${card ? "popup_opened" : ""}`}
      onClick={onFieldClickClose}
    >
      <div className="popup__container-image">
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <p className="popup__name-image"> {card?.name} </p>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
