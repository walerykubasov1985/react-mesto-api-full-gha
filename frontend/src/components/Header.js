import React from "react";
import headerLogo from "../images/logo-min.svg";
import { Routes, Route, Link } from "react-router-dom";


function Header({ email, loggedIn, signOut, onInfoHeader, isOpen}) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={headerLogo}
        alt="Логотип Место-Россия"
      />
      {loggedIn ? (
        <div className="header__info">
           <div className={`header__menu ${isOpen ? "header__menu_activ" : ""}`} onClick={onInfoHeader}></div> 
          <p className="header__email">{loggedIn ? email : ""}</p>
          <Link to="/sign-in" className="header__link header__link_exit" onClick={signOut}>
            Выйти
          </Link>
        </div>
      ) : (
        <div className="header__info">
          <Routes>
            <Route
              path="/sign-up"
              element={
                <Link to="/sign-in" className="header__link header__link_enter">
                  Войти
                </Link>
              }
            />
            <Route
              path="/sign-in"
              element={
                <Link to="/sign-up" className="header__link header__link_registration">
                  Регистрация
                </Link>
              }
            />
          </Routes>
        </div>
      )}
    </header>
  );
}

export default Header;
