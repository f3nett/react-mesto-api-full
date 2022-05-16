class Api {
    constructor({url}) {
        this._url = url;
    }

    _checkResponse(res) {
    //проверка ответа
        if (res.ok) {
            return res.json();
        }
        else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getUser() {
    //получение информации о пользователе
        return fetch(`${this._url}/users/me`, {
            headers: {
              authorization: localStorage.getItem('jwt')
            }
          })
            .then(this._checkResponse)
    }

    setUserData(userData) {
    //обновление информации о пользователе
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: userData.name, about: userData.about})
        })
            .then(this._checkResponse)
    }

    setUserPhoto(userPhoto) {
    //обновление аватара пользователя
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({avatar: userPhoto.avatar})
        })
            .then(this._checkResponse)
    }

    getCards() {
    //получение стартового набора карточек с сервера
        return fetch(`${this._url}/cards`, {
            headers: {
              authorization: localStorage.getItem('jwt')
            }
          })
            .then(this._checkResponse)
    }

    postCard(card) {
    //пост новой карточки на сервер
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: localStorage.getItem('jwt'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: card.name, link: card.link})
        })
            .then(this._checkResponse)
    }

    deleteCard(cardId) {
    //удаление карточки по ее id
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: localStorage.getItem('jwt')
            }
        })
            .then(this._checkResponse)
    }

    addLike(cardId) {
    //добавление лайка карточке
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: localStorage.getItem('jwt')
            }
        })
            .then(this._checkResponse)
    }

    deleteLike(cardId) {
    //удаление лайка с карточки
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: localStorage.getItem('jwt')
            }
        })
            .then(this._checkResponse)       
    }
}


const api = new Api({url: 'https://api.mesto.f3nett.nomoreparties.sbs'});

export default api;