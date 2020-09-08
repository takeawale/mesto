
import Card from './Card.js';
import FormValidation from './FormValidation.js';

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
const imageModal = document.querySelector(".popup_type_image");


const editForm = editProfileModal.querySelector(".form");
const addCardForm = addCardModal.querySelector(".form");
const addFormValidation = new FormValidation(config, addCardForm)
addFormValidation.enableValidation()

const editFormValidation = new FormValidation(config, editForm)
editFormValidation.enableValidation()


//buttons

const editButton = document.querySelector(".profile__editButton");
const addButton = document.querySelector(".profile__addButton");
const imageButton = document.querySelector(".elements__image-button");

const closeEditModal = editProfileModal.querySelector(".popup__button-cross");
const closeAddModal = addCardModal.querySelector(".popup__button-cross");
const closeImageModal = imageModal.querySelector(".popup__button-cross");

const formButtonSave = editProfileModal.querySelector(".form__button");
const formButtonCreate = addCardForm.querySelector(".form__button");

//title and description

const profileUser = document.querySelector(".profile__user");
const profileDescription = document.querySelector(".profile__description");

// inputs

const titleInputValue = editForm.querySelector(".form__input_content_name");
const descriptionInputValue = editForm.querySelector(
  ".form__input_content_job"
);

const placeInput = addCardForm.querySelector(".form__input_type_place");
const urlInput = addCardForm.querySelector(".form__input_type_url");

const imageModalTitle = imageModal.querySelector(".popup__caption");
const imageModalImg = imageModal.querySelector(".popup__image");

const cardTemplate = document
  .querySelector("#card")
  .content.querySelector(".elements__item");
const list = document.querySelector(".elements");




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

export default function handleImageClick(data) {
  imageModalImg.src = data.link;
  imageModalImg.alt = `Изображение ${data.name}`;
  imageModalTitle.textContent = data.name;

  toggleModalWindow(imageModal)
};

const allPopups = Array.from(document.querySelectorAll('.popup'));
const isPopupOpened = (popup) => {
  return popup.classList.contains("popup_opened");
}


function toggleModalWindow(modalWindow) {
  modalWindow.classList.toggle("popup_opened");
  if (isPopupOpened(modalWindow)) {
    setEventListenerEsc();
  } else {
    deleteEventListenerEsc();
  }
}

const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    const popupElement = allPopups.find(function (popupItem) {
      return isPopupOpened(popupItem);
    });
    if (popupElement != undefined) {
      toggleModalWindow(popupElement);
    }
  }
}


function setEventListenerEsc(modalWindow) {   
  document.addEventListener('keydown', handleEscape);

}

function deleteEventListenerEsc(modalWindow) {   
  document.removeEventListener('keydown', handleEscape);

}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileUser.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;

  toggleModalWindow(editProfileModal);
}

function addCardSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({ name: placeInput.value, link: urlInput.value });
  profileUser.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  toggleModalWindow(addCardModal);
}

function renderCard(data) {
  const card = new Card(data, ".card")
  list.prepend(card.getView());

}

initialCards.forEach((data) => {
  renderCard(data);
});



editForm.addEventListener("submit", formSubmitHandler);
addCardForm.addEventListener("submit", addCardSubmitHandler);

editButton.addEventListener("click", () => {
  toggleModalWindow(editProfileModal);


  titleInputValue.value = profileUser.textContent
  descriptionInputValue.value = profileDescription.textContent



});



closeEditModal.addEventListener("click", () => {
  toggleModalWindow(editProfileModal);


});

addButton.addEventListener("click", () => {

  toggleModalWindow(addCardModal);

});

closeAddModal.addEventListener("click", () => {
  toggleModalWindow(addCardModal);

});

closeImageModal.addEventListener("click", () => {
  toggleModalWindow(imageModal);

});


function onPopupOverlayClick(evt) {
  if (evt.target == evt.currentTarget) {
    toggleModalWindow(evt.target);
  }
}

editProfileModal.addEventListener("click", onPopupOverlayClick);
addCardModal.addEventListener("click", onPopupOverlayClick);
imageModal.addEventListener("click", onPopupOverlayClick);