const handleOriginalResponse = res => res.ok ? res.json() : Promise.reject('ERROR' + res.statusText);
const handleErrorResponse = error => console.log(error);

export default class Api {
constructor({baseUrl, headers}) {
this._baseUrl = baseUrl,
this._headers = headers
}

getUserInfo() {
  return fetch(`${this._baseUrl}/users/me`, {
    headers: {
      authorization: this._headers.authorization
    }
  })
    .then(handleOriginalResponse)
    .catch(handleErrorResponse)
}

getCardsInfo() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: this._headers.authorization
        }
      })
        .then(handleOriginalResponse)
        .catch(handleErrorResponse)
}

getApplicationInfo() {
    return Promise.all([this.getUserInfo(), this.getCardsInfo()])
}

editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: {
          authorization: this._headers.authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
          }),
        method: 'PATCH'
      })
        .then(handleOriginalResponse)
        .catch(handleErrorResponse)
}

addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: this._headers.authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
          }),
        method: 'POST'
      })
        .then(handleOriginalResponse)
        .catch(handleErrorResponse)
}
 

removeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
        headers: {
          authorization: this._headers.authorization,
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      })
        .then(handleOriginalResponse)
        .catch(handleErrorResponse)
}

changeLikeStatus(cardId, isLiked) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
        headers: {
          authorization: this._headers.authorization,
          'Content-Type': 'application/json'
        },
        method: isLiked ? 'DELETE' : 'PUT'
      })
        .then(handleOriginalResponse)
        .catch(handleErrorResponse)
}

setUserAvatar(avatarSrc) {
    return fetch(this._baseUrl + '/users/me/avatar', {
        headers: {
          authorization: this._headers.authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        avatar: avatarSrc
          }),
        method: 'PATCH'
      })
        .then(handleOriginalResponse)
        .catch(handleErrorResponse)
}
}