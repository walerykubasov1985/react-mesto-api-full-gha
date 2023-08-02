import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
  isOpen,
  onClose,
  onFieldClickClose,
  onUpdateAvatar,
  isLoading,
}) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="update-avatar"
      title="Обновить аватар"
      nameBtnSubmit={isLoading ? 'Сохранение...' : 'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onFieldClickClose={onFieldClickClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          className="form__input form__input_type_avatar"
          id="avatar"
          type="URL"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          ref={avatarRef}
        />
        <span className="form__input-error avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
