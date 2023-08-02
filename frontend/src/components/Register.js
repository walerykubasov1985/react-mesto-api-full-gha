import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as auth from "../Utils/auth";

function Register({ onRegistr, handleSucces }) {
  const [formValue, setFormValue] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register(formValue.password, formValue.email)
      .then(() => {
        handleSucces(true);
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        handleSucces(false);
        console.log(err);
      })
      .finally(() => {
        onRegistr();
      });
  };

  return (
    <main>
      <div className="login register">
        <h2 className="login__name register__name">Регистрация</h2>
        <form
          className="form form__login form__register"
          onSubmit={handleSubmit}
        >
          <input
            className="form__input form__input_login form__input_register"
            required
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={formValue.email}
            onChange={handleChange}
          />

          <input
            className="form__input form__input_login form__input_register"
            required
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={formValue.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="form__button form__button_login form__button_register"
          >
            Зарегистрироваться
          </button>
        </form>
        <div className="register__signin">
          <p className="register__text-link">Уже зарегистрированы? </p>
          <Link to="/sign-in" className="register__login-link">
            Войти
          </Link>
        </div>
      </div>
    </main>
  );
}
export default Register;
