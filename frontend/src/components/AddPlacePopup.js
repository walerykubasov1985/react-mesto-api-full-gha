import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
  isOpen,
  onClose,
  onFieldClickClose,
  onAddPlace,
  isLoading,
}) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  function handleChangeCardName(evt) {
    setName(evt.target.value);
  }

  function handleChangeCardLink(evt) {
    setLink(evt.target.value);
  }

  return (
    <PopupWithForm
      name="add-Card"
      title="Новое место"
      nameBtnSubmit={isLoading ? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onFieldClickClose={onFieldClickClose}
      onAddPlace={onAddPlace}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          className="form__input form__input_type_card-name"
          id="cardName"
          type="text"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={name || ""}
          onChange={handleChangeCardName}
        />
        <span className="form__input-error cardName-error"></span>
      </label>
      <label className="form__field">
        <input
          className="form__input form__input_type_card-photo"
          id="cardPhoto"
          type="URL"
          name="link"
          placeholder="Ссылка на картинку"
          required
          value={link || ""}
          onChange={handleChangeCardLink}
        />
        <span className="form__input-error cardPhoto-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
