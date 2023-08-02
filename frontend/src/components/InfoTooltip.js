import React from "react";
import yesImg from "../images/Union +.png";
import noImg from "../images/Union.png";

function InfoTooltip({ isOpen, isSucces, onClose }) {
  return (
      <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
        <div className="popup__container popup__container-info-tooltip">
          {isSucces ? (
            <>
              <img className="popup__info-image" src={yesImg} alt="галочка" />
              <h2 className="popup__info-text">
                Вы успешно зарегистрировались!
              </h2>
            </>
          ) : (
            <>
              <img className="popup__info-image" src={noImg} alt="крест" />
              <h2 className="popup__info-text">
                Что-то пошло не так! Попробуйте ещё раз.
              </h2>
            </>
          )}
          <button
            className="popup__button-close"
            type="button"
            onClick={onClose}
          />
        </div>
      </div>
  );
}

export default InfoTooltip;
