
import handleImageClick from './index.js';
export default class Card {
  constructor({ name, link }, template) {
    this._name = name
    this._link = link
    this._template = template
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
    const cardLikeButton = this._cardElement.querySelector(".elements__button");
    const cardDeleteButton = this._cardElement.querySelector(
      ".elements__button-delete"
    );
    cardLikeButton.addEventListener("click", this._handleLikeIcon)
    cardDeleteButton.addEventListener("click", this._handleDeleteClick)
    cardImage.addEventListener("click", () => {
      this.handleImageClick()
    });
  }

  handleImageClick() {
    handleImageClick({ name: this._name, link: this._link })
  }

  _handleDeleteClick = () => {
    this._cardElement.remove();
  }
  _handleLikeIcon(evt) {
    evt.target.classList.toggle("elements__buttonActive");
  }
  getView() {
    const cardTemplate = this._getTemplate();
    this._cardElement = cardTemplate.cloneNode(true);


    const cardImage = this._cardElement.querySelector(".elements__image");
    const cardTitle = this._cardElement.querySelector(".element__title");


    cardTitle.textContent = this._name
    cardImage.style.backgroundImage = `url(${this._link})`
    this._setEventListeners()
    return this._cardElement;
  }
}

