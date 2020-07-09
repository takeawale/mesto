const openModalButton = document.querySelector('.profile__editButton');
const closeModalButton = document.querySelector('.popup__button-cross');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_content_name');
const jobInput = formElement.querySelector('.form__input_content_job');
const elementName = document.querySelector('.profile__user');
const elementDescription = document.querySelector('.profile__description');
const formButton = document.querySelector('.form__button');




openModalButton.addEventListener('click', () => {
    popup.classList.add('popup_opened');

})


closeModalButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened');

})


formButton.addEventListener('click', () => {
    popup.classList.remove('popup_opened');

})



function formSubmitHandler(evt) {

    evt.preventDefault(); 

    elementName.textContent = nameInput.value;
    elementDescription.textContent = jobInput.value;
};

formElement.addEventListener('submit', formSubmitHandler);





