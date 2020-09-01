const imageModal = document.querySelector(".popup_type_image");
const imageModalTitle = imageModal.querySelector(".popup__caption");
const imageModalImg = imageModal.querySelector(".popup__image");

function toggleModalWindow(modalWindow, name, link) {
  modalWindow.classList.toggle("popup_opened");
  if (isPopupOpened(modalWindow)) {
    imageModalTitle.textContent = name
    imageModalImg.src = link
    setEventListenerEsc();
  } else {
    deleteEventListenerEsc();
  }
}

function setEventListenerEsc(modalWindow) {// открыть модалку    
  document.addEventListener('keydown', handleEscape);

}

function deleteEventListenerEsc(modalWindow) {// закрыть модалку    
document.removeEventListener('keydown', handleEscape);
 
}

const isPopupOpened = (popup) => {
  return popup.classList.contains("popup_opened");
}

const handleEscape = (evt) => {
  if (evt.key === "Escape") {

      toggleModalWindow(imageModal);
    }
  }


export default class Card {
  constructor({ name, link }, template) {
    this._name = name
    this._link = link
    console.log({ name, link })
    // ...
    this._template = template
    // ...
  }


  _getTemplate() {

    this._element = this._template
      .content
      .querySelector('.elements__item')
      .cloneNode(true)
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
this._handleImageClick()
    });
  }



  
  _handleImageClick() {
toggleModalWindow(imageModal, this._name, this._link)
  }
  _handleDeleteClick = () => {
    this._cardElement.remove();
  }


  _handleLikeIcon(evt) {
    evt.target.classList.toggle("elements__buttonActive");
  }

  getView() {
    const cardTemplate = document
      .querySelector(this._template)
      .content.querySelector(".elements__item");

    this._cardElement = cardTemplate.cloneNode(true);




    const cardImage = this._cardElement.querySelector(".elements__image");
    const cardTitle = this._cardElement.querySelector(".element__title");
    this._setEventListeners()



    cardTitle.textContent = this._name;
    cardImage.style.backgroundImage = `url(${this._link})`;

    return this._cardElement;
  }
}

