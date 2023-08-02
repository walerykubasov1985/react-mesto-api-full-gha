import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  nameBtnSubmit,
  isOpen,
  onClose,
  onFieldClickClose,
  nameForm,
  onSubmit,
  
}) {
  return (
    <div
      className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={onFieldClickClose}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="form form_profil" name={nameForm} onSubmit={onSubmit}>
          {children}

          <button className="form__button" type="submit">
            {nameBtnSubmit}
          </button>
        </form>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
