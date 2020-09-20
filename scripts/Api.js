export default class Api {
constructor({baseUrl, headers}) {
this._baseUrl = baseUrl,
this._headers = headers
}

getUserInfo() {
return fetch(this._baseUrl + '/users/me', {
    headers: {
      authorization: this._headers.authorization
    }
  })
    .then(res => res.ok ? res.json() : Promise.reject('ERROR' + res.statusText))
.catch(error => {console.log(error)})
}

getCardsInfo() {
    return fetch(this._baseUrl + '/cards', {
        headers: {
          authorization: this._headers.authorization
        }
      })
        .then(res => res.ok ? res.json() : Promise.reject('ERROR' + res.statusText))
        .catch(error => {console.log(error)})
}

getApplicationInfo() {
    return Promise.all([this.getUserInfo(), this.getCardsInfo()])
}

editProfile(name, about) {
    return fetch(this._baseUrl + '/users/me', {
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
        .then(res => res.ok ? res.json() : Promise.reject('ERROR' + res.statusText))
        .catch(error => {console.log(error)})
}

addCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
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
        .then(res => res.ok ? res.json() : Promise.reject('ERROR' + res.statusText))
        .catch(error => {console.log(error)})
}
 

removeCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
        headers: {
          authorization: this._headers.authorization,
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      })
        .then(res => res.ok ? res.json() : Promise.reject('ERROR' + res.statusText))
        .catch(error => {console.log(error)})
}

changeLikeStatus(cardId, isLiked) {
    return fetch(this._baseUrl + '/cards/likes/' + cardId, {
        headers: {
          authorization: this._headers.authorization,
          'Content-Type': 'application/json'
        },
        method: isLiked ? 'DELETE' : 'PUT'
      })
        .then(res => res.ok ? res.json() : Promise.reject('ERROR' + res.statusText))
        .catch(error => {console.log(error)})
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
        .then(res => res.ok ? res.json() : Promise.reject('ERROR' + res.statusText))
        .catch(error => {console.log(error)})
}
}