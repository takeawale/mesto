export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelect }) {
    this._nameElement = document.querySelector(nameSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelect);
  }

  getUserInfo() {
    return { name: this._nameElement.textContent, description: this._descriptionElement.textContent }
  }
  setUserInfo(name, description, avatar) {
    console.log("fks;fs", name, description, avatar)
    this._nameElement.textContent = name;
    this._descriptionElement.textContent = description;
    this._avatarElement.src = avatar;
}
}


