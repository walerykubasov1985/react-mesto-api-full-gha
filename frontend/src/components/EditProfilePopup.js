import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../context/CurrentUserContext";

function EditProfilePopup({
  isOpen,
  onClose,
  onFieldClickClose,
  onUpdateUser,
  isLoading
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeUserName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }
  const handleSubmit = (evt) => {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  };

  return (
    <PopupWithForm
      name="profil"
      title="Редактировать профиль"
      nameBtnSubmit={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onFieldClickClose={onFieldClickClose}
      onSubmit={handleSubmit}
      
    >
      <label className="form__field">
        <input
          className="form__input form__input_type_name"
          id="name"
          type="text"
          name="name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
          value={name || ""}
          onChange={handleChangeUserName}
        />
        <span className="form__input-error name-error"></span>
      </label>
      <label className="form__field">
        <input
          className="form__input form__input_type_job"
          id="job"
          type="text"
          name="about"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
          value={description || ""}
          onChange={handleChangeDescription}
        />
        <span className="form__input-error job-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
