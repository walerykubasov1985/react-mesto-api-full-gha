import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../Utils/api";
import CurrentUserContext from "../context/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import { ProtectedRoute } from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../Utils/auth";
import PageNotFound from "./PageNotFound";
import InfoHeaderPopup from "./InfoHeaderPopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isInfoHeaderPopupOpen, setIsInfoHeaderPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSucces, setIsSucces] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();

  const handlLogin = () => {
    setLoggedIn(true);
  };

  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          setEmail(data.email);
          handlLogin();
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    handleCheckToken();
  }, []);

  function handleSignOut() {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
    setLoggedIn(false);
    setIsInfoHeaderPopupOpen(false);
  }

  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          handlLogin();
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(id => id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleInfoTooltip = () => {
    setIsInfoTooltipPopupOpen(true);
  };

  const handleInfoHeaderClick = () => {
    setIsInfoHeaderPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const closeAllPopups = () => {
    setIsInfoTooltipPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoHeaderPopupOpen(false);
    setSelectedCard(null);
  };

  const handlePopupFieldClick = (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  };
  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const isOpen =
    isInfoHeaderPopupOpen ||
    isInfoTooltipPopupOpen ||
    isInfoTooltipPopupOpen ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([info, cards]) => {
        setCurrentUser(info);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <InfoHeaderPopup
          isOpen={isInfoHeaderPopupOpen}
          email={email}
          signOut={handleSignOut}
          onClose={closeAllPopups}
        />
        <Header
          isOpen={isOpen}
          email={email}
          loggedIn={loggedIn}
          signOut={handleSignOut}
          onInfoHeader={handleInfoHeaderClick}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                loggedIn={loggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardDelete={handleCardDelete}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
              />
            }
          />
          <Route
            path="/sign-up"
            element={
              <Register
                handleSucces={setIsSucces}
                onRegistr={handleInfoTooltip}
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login
                handleLogin={handleLogin}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="sign-in" replace />
            }
          />
        </Routes>
        <Footer />
      </div>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onFieldClickClose={handlePopupFieldClick}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onFieldClickClose={handlePopupFieldClick}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onFieldClickClose={handlePopupFieldClick}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onFieldClickClose={handlePopupFieldClick}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
      />

      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        isSucces={isSucces}
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
