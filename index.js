const openModalButton = document.querySelector('.profile__editButton');
const closeModalButton = document.querySelector('.popup__button-cross');
const popup = document.querySelector('.popup');



openModalButton.addEventListener('click', () => {
    popup.classList.add('popup_opened');

})


closeModalButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened');

})




const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_content_name');
const jobInput = formElement.querySelector('.form__input_content_job');
const elementName = document.querySelector('.profile__user');
const elementDescription = document.querySelector('.profile__description');


function formSubmitHandler(evt) {

    evt.preventDefault(); 

    elementName.textContent = nameInput.value;
    elementDescription.textContent = jobInput.value;
};

formElement.addEventListener('submit', formSubmitHandler);




const popupButton = document.querySelector('.popup__button');

popupButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened');

})




