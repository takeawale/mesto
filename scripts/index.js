import "../pages/index.css"
import Section from './section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

import Card from './Card.js';
import FormValidation from './FormValidation.js';
import UserInfo from './userInfo.js';

const config = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'form__input-error_visible'
}

// wrappers
const addCardModal = document.querySelector(".popup_type_new-card");
const editProfileModal = document.querySelector(".popup_type_edit");



const editForm = editProfileModal.querySelector(".form");
const addCardForm = addCardModal.querySelector(".form");
const addFormValidation = new FormValidation(config, addCardForm)
addFormValidation.enableValidation()

const editFormValidation = new FormValidation(config, editForm)
editFormValidation.enableValidation()


//buttons

const editButton = document.querySelector(".profile__editButton");
const addButton = document.querySelector(".profile__addButton");

// inputs

const titleInputValue = editForm.querySelector(".form__input_content_name");
const descriptionInputValue = editForm.querySelector(
  ".form__input_content_job"
);




const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];


const section = new Section({
  items: initialCards, renderer: (data) => {

    const card = new Card(data, ".card", (link, name) => {
      popupWithImage.open(link, name)
    })
    section.addItem(card.getView())
    console.log(card)
  }
}, '.elements');
section.renderItems()

const popup = new PopupWithForm('.popup_type_edit', ({name, description}) => {
  console.log('213')
userInfo.setUserInfo(name, description)
});


popup.setEventListneres()

editButton.addEventListener("click", () => {
  popup.open();
  const data = userInfo.getUserInfo()
  titleInputValue.value = data.name;
  descriptionInputValue.value = data.description;

});


const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListneres()



const popupAddCard = new PopupWithForm('.popup_type_new-card', (data) => {
const card = new Card(data, ".card", (link, name) => {
  popupWithImage.open(link, name)
})
section.addItem(card.getView())
});


popupAddCard.setEventListneres()

addButton.addEventListener("click", () => {
  popupAddCard.open();
} )


const userInfo = new UserInfo({nameSelector: ".profile__user", descriptionSelector: ".profile__description"});