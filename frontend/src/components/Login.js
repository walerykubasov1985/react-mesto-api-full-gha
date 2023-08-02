import React, { useState } from "react";



function Login({handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    handleLogin(password, email)
  };

  return (
    <main>
      <div className="login">
        <h2 className="login__name">Вход</h2>
        <form className="form form__login" onSubmit={handleLoginSubmit}>
          <input
            className="form__input form__input_login"
            required
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />

          <input
            className="form__input form__input_login"
            required
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={handlePasswordChange}
          />

          <button type="submit" className="form__button form__button_login">
            Войти
          </button>
        </form>
      </div>
    </main>
  );
}

export default Login;
