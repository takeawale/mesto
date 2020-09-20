import Api from '../scripts/Api.js';
import "./index.css"
import Section from '../scripts/section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithFormConfirm from '../scripts/PopupWithFormConfirm.js';

import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import UserInfo from '../scripts/userInfo.js';


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
const avatarModal = document.querySelector(".popup_type_avatar");


const editForm = editProfileModal.querySelector(".form");
const addCardForm = addCardModal.querySelector(".form");
const avatForm = avatarModal.querySelector(".form");
const addFormValidation = new FormValidator(config, addCardForm)
addFormValidation.enableValidation()

const editFormValidation = new FormValidator(config, editForm)
editFormValidation.enableValidation()

const avatarFormValidation = new FormValidator(config, avatForm)
avatarFormValidation.enableValidation()

//buttons

const editButton = document.querySelector(".profile__editButton");
const addButton = document.querySelector(".profile__addButton");

// inputs

const titleInputValue = editForm.querySelector(".form__input_content_name");
const descriptionInputValue = editForm.querySelector(
  ".form__input_content_job"
);


const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: 'a50fd3b6-ceb7-49b6-9ba4-f6382a4b661a',
    'content-type': 'application/json'
  }
});




api.getApplicationInfo()
  .then(([userInfoData, cardsData]) => {
    console.log(userInfoData)

    const createCard = (data) => {

      return new Card(
        {
          ...data,
          userId: userInfoData._id,
        },
        ".card",
        (link, name) => {
          popupWithImage.open(link, name)
        },

        (card) => {
          popupWithFormConfirm.open();
          popupWithFormConfirm.setSubmitHandler(() => {
            api.removeCard(card.getId())
              .then(() => {
                card.removeCard();
                popupWithFormConfirm.close();
              })
              .catch(error => {
                console.log("ошибка при удалении карточки", error)
              })

          })
        },
        (card) => {
          console.log('liked')
          api.changeLikeStatus(card.getId(), card.isLiked())
            .then((res) => {
              console.log(res)
              card.setNewLikesData(res)
            })
            .catch(error => {
              console.log("ошибка при лайке", error)
            })

        }
      )
    }



    //рендерим карточки
    const section = new Section({
      items: cardsData, renderer: (data) => {

        const card = createCard(data);
        section.addItem(card.getView(), true)

      }
    }, '.elements');
    section.renderItems()

    // рендерим юзера
    const userInfo = new UserInfo({
      nameSelector: ".profile__user",
      descriptionSelector: ".profile__description",
      avatarSelect: '.profile__avatar',
    });
    userInfo.setUserInfo(userInfoData.name, userInfoData.about, userInfoData.avatar)


    //создание модалки редактирования
    const popup = new PopupWithForm('.popup_type_edit', ({ name, description }) => {
      changeButtonFormText(true)
      api.editProfile(name, description)
        .then(res => {

          changeButtonFormText(false)
          popup.close()
          userInfo.setUserInfo(res.name, res.about, res.avatar)
        })
        .catch(error => {
          console.log("ошибка при редактировании профиля", error)
        })

    });


    popup.setEventListneres()

    editButton.addEventListener("click", () => {
      popup.open();
      const data = userInfo.getUserInfo()
      titleInputValue.value = data.name;
      descriptionInputValue.value = data.description;

    });

    //создание функциональности добавления карочки

    const popupAddCard = new PopupWithForm('.popup_type_new-card', (data) => {
      changeButtonFormText(true)
      api.addCard(data.name, data.link)
        .then(res => {
          const card = createCard(res);
          section.addItem(card.getView())
          changeButtonFormText(false)
          popupAddCard.close()
        })
        .catch(error => {
          console.log("ошибка при добавлении карточки", error)
        })


    });


    popupAddCard.setEventListneres()

    addButton.addEventListener("click", () => {
      popupAddCard.open();
    })


    // модалка Подтверждения 
    const popupWithFormConfirm = new PopupWithFormConfirm('.popup_type_submit')
    popupWithFormConfirm.setEventListneres();

    // модалка аватарки

    const popupAvatar = new PopupWithForm('.popup_type_avatar', (data) => {
      changeButtonFormText(true)

      api.setUserAvatar(data.link)
        .then((res) => {

          userInfo.setUserInfo(res.name, res.about, res.avatar)
          changeButtonFormText(false)
          popupAvatar.close()
        })
        .catch(error => {
          console.log("ошибка при изменении аватара", error)
        })

    })
    popupAvatar.setEventListneres()
    const avatar = document.querySelector('.profile__avatar');
    avatar.addEventListener('click', () => {
      popupAvatar.open()
    })

  })
  .catch(error => {
    console.log("ошибка на этапе рендеринга", error)
  })






const changeButtonFormText = (isLoading) => {
  const button = document.querySelector('.popup_opened .form__button')
  button.textContent = isLoading ? 'Сохранение...' : 'Сохранить'
}


const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListneres()




