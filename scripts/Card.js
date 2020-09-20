
export default class Card {
  constructor({ name, link, likes, _id, userId, owner }, template, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._template = template;
    this._id = _id;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._ownerId = owner._id;
    this._handleLikeClick = handleLikeClick;

  }

getId() {
  return this._id;

}

  _getTemplate() {
    const cardTemplate = document.querySelector(this._template)
      .content
      .querySelector('.elements__item')
      .cloneNode(true)

    return cardTemplate;
  }
  _setEventListeners() {
    const cardImage = this._cardElement.querySelector(".elements__image");
    this._cardLikeButton = this._cardElement.querySelector(".elements__button");
    const cardDeleteButton = this._cardElement.querySelector(
      ".elements__button-delete"
    );
    this._cardLikeButton.addEventListener("click",  () => {this._handleLikeClick(this)})
    cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this)
    })
    cardImage.addEventListener("click", () => {
      this._handleCardClick(this._link, this._name)
    });
  }
  handleImageClick() {
    handleImageClick({ name: this._name, link: this._link })
  }

  removeCard() {
    this._cardElement.remove();
  }
  _handleLikeIcon(evt) {
    this._cardLikeButton.classList.toggle("elements__buttonActive");
  }
  getView() {
    this._cardElement = this._getTemplate();

    const cardImage = this._cardElement.querySelector(".elements__image");
    const cardTitle = this._cardElement.querySelector(".element__title");


    cardTitle.textContent = this._name
    cardImage.style.backgroundImage = `url(${this._link})`
    this._setEventListeners()
    this._updateLikeInfo()
    if(this._ownerId !== this._userId) {
      this._cardElement.querySelector('.elements__button-delete').classList.add('elements__button-delete_hidden')
    }
    return this._cardElement;
  }

isLiked() {
  return this._likes.find((user) => {
return user._id == this._userId
  })
}
  _updateLikeInfo() {
this._cardElement.querySelector('.elements__like-count').textContent = this._likes.length;
if (this.isLiked()) {
  this._cardLikeButton.classList.add("elements__buttonActive");
} else {
  this._cardLikeButton.classList.remove("elements__buttonActive");
}

  }


  setNewLikesData(data) {
    this._likes = data.likes;
    this._updateLikeInfo()
  }
}





