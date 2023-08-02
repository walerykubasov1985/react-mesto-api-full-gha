import { Link } from "react-router-dom";

function InfoHeaderPopup({ isOpen, email, signOut, onClose }) {
  return (
    <div className={`popup__header-info ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container-header-info">
        <p className="header__email-min">{email}</p>
        <Link to="/sign-in" className="header__link-min" onClick={signOut}>
          Выйти
        </Link>
      </div>
      <button
        className="popup__button-close popup__button-close_header-info"
        type="button"
        onClick={onClose}
      />
    </div>
  );
}
export default InfoHeaderPopup;
