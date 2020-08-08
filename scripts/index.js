// wrappers
const addCardModal = document.querySelector('.popup_type_new-card');
const editProfileModal = document.querySelector('.popup_type_edit');
const imageModal = document.querySelector('.popup_type_image');

const editForm = editProfileModal.querySelector('.form');
const addCardForm = addCardModal.querySelector('.form');

//buttons

const editButton = document.querySelector('.profile__editButton');
const addButton = document.querySelector('.profile__addButton');
const imageButton = document.querySelector('.elements__image-button');

const closeEditModal = editProfileModal.querySelector('.popup__button-cross');
const closeAddModal = addCardModal.querySelector('.popup__button-cross');
const closeImageModal = imageModal.querySelector('.popup__button-cross');


const formButtonSave = editProfileModal.querySelector('.form__button');
const formButtonCreate = addCardForm.querySelector('.form__button');



//title and description

const profileUser = document.querySelector('.profile__user');
const profileDescription = document.querySelector('.profile__description');


// inputs

const titleInputValue = editForm.querySelector('.form__input_content_name');
const descriptionInputValue = editForm.querySelector('.form__input_content_job');

const placeInput = addCardForm.querySelector('.form__input_type_place');
const urlInput = addCardForm.querySelector('.form__input_type_url');

const imageModalTitle = imageModal.querySelector('.popup__caption');
const imageModalImg = imageModal.querySelector('.popup__image')



const cardTemplate =  document.querySelector('#card').content.querySelector('.elements__item');
const list = document.querySelector('.elements');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



/*
//feature of closing popup by click on esc button
  document.addEventListener('keydown', function (evt) {
    if(evt.keyCode === 27) addCardModal.classList.remove('popup_opened');
  });

  document.addEventListener('keydown', function (evt) {
    if(evt.keyCode === 27) editProfileModal.classList.remove('popup_opened');
  });

  document.addEventListener('keydown', function (evt) {
    if(evt.keyCode === 27) imageModal.classList.remove('popup_opened');
  });

*/


const handleImageClick = (data) => {
    imageModalImg.src = data.link;
    imageModalImg.alt = `Изображение ${data.name}`;
    imageModalTitle.textContent = data.name;
    toggleModalWindow(imageModal);
  };

  function toggleModalWindow(modalWindow) {
    modalWindow.classList.toggle('popup_opened');
      }



function formSubmitHandler(evt) {

    evt.preventDefault(); 


    profileUser.textContent = titleInputValue.value;
    profileDescription.textContent = descriptionInputValue.value;

    toggleModalWindow(editProfileModal);
};


function addCardSubmitHandler(evt) {
   
    evt.preventDefault(); 


    renderCard({name: placeInput.value, link: urlInput.value})
     profileUser.textContent = titleInputValue.value;
    profileDescription.textContent = descriptionInputValue.value;
    toggleModalWindow(addCardModal); 
}


function renderCard(data) {
    list.prepend(createCard(data));
}



initialCards.forEach((data) => {
    renderCard(data)
})


function createCard(data) {
    const cardElement = cardTemplate.cloneNode(true);
    
    const cardImage = cardElement.querySelector('.elements__image');
    const cardTitle = cardElement.querySelector('.element__title');
    const cardLikeButton = cardElement.querySelector('.elements__button');
    const cardDeleteButton = cardElement.querySelector('.elements__button-delete');
    


    cardLikeButton.addEventListener('click', (event) => handleLikeIcon(event));
    const handleLikeIcon = (evt) => {
        evt.target.classList.toggle('elements__buttonActive');
    };

    cardDeleteButton.addEventListener('click', () => {
        cardElement.remove();
        // handleDeleteClick()
        });

    
    cardImage.addEventListener('click', () => {
        handleImageClick(data)
        });
    
    
    cardTitle.textContent = data.name;
    cardImage.style.backgroundImage = `url(${data.link})`;
    
    
    return cardElement;
}



editForm.addEventListener('submit', formSubmitHandler);
addCardForm.addEventListener('submit', addCardSubmitHandler);


editButton.addEventListener('click', () => {
    toggleModalWindow(editProfileModal);
});

closeEditModal.addEventListener('click', () => {
    toggleModalWindow(editProfileModal);
});

addButton.addEventListener('click', () => {
    toggleModalWindow(addCardModal);
});

closeAddModal.addEventListener('click', () => {
    toggleModalWindow(addCardModal);
});

closeImageModal.addEventListener('click', () => {
    toggleModalWindow(imageModal);
});


// упростила созданием новой ф-ии
function onPopupOverlayClick(evt) {
    if (evt.target = evt.currentTarget) { 
        toggleModalWindow(evt.target)}
  }
  
  editProfileModal.addEventListener('click', onPopupOverlayClick);
  addCardModal.addEventListener('click', onPopupOverlayClick);
  imageModal.addEventListener('click', onPopupOverlayClick);


  /* выше переделано
//feature of closing popup by click on overlay
editProfileModal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup_closed')) {
        toggleModalWindow(editProfileModal);
    }
}); 

addCardModal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup_closed')) {
        toggleModalWindow(addCardModal);
    }
}); 

imageModal.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup_closed')) {
        toggleModalWindow(imageModal);
    }
}); 

*/