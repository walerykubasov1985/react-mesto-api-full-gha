class Api {
  constructor(setting) {
    this._address = setting.baseUrl;
  }
  //Проверка ответа сервера
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  //получение инфо профиля
  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    }).then((res) => this._getResponseData(res));
  }
  //редактирование профиля
  editUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._getResponseData(res));
  }
  // Редактирование аватара
  editAvatar(data) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }
  // получение карточек с сервера
  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    }).then((res) => this._getResponseData(res));
  }
  //добавление карточки
  addCard(data) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._getResponseData(res));
  }
  // Удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    }).then((res) => this._getResponseData(res));
  }
  // Ставим лайк карточке
  addLike(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    }).then((res) => this._getResponseData(res));
  }
  // Удаляем лайк
  deleteLike(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-type': 'application/json'
      },
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if(isLiked){
      return this.addLike(cardId) ;
    }
    return this.deleteLike(cardId);
  }
}

const api = new Api({
  baseUrl: "http://mesto2013.wawa234.nomoredomains.xyz",
});
export default api;
