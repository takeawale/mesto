




const formElement = document.querySelector('.form')
const formInput = formElement.querySelector('.form__input')
const formError = formElement.querySelector(`#${ formInput.id }-error`)
formElement.addEventListener('submit', function (evt) {
  evt.preventDefault()
})
formInput.addEventListener('input', function (evt) {
})
//Функционал включения\выключения кнопки сабмита вынесла в отдельные функции. 
const popupButtonDisabled = (buttonSubmit) => {
  buttonSubmit.classList.add('form__button_disabled');
  buttonSubmit.disabled = true;
}

const popupButtonAсtive = (buttonSubmit) => {
  buttonSubmit.classList.remove('form__button_disabled');
  buttonSubmit.disabled = false;
}
const showInputError = ({ input, error, buttonSubmit }) => {
  const errorMessage = input.validationMessage || 'error'
  input.classList.add('form__input_invalid');
  error.textContent = errorMessage
  error.classList.add('form__input-error_active');
  popupButtonDisabled(buttonSubmit);

}
const hideInputError = ({ input, error, buttonSubmit }) => {
  input.classList.remove('form__input_invalid');
  error.classList.remove('form__input-error_active');
  error.textContent = '';
  popupButtonAсtive(buttonSubmit);
}

const isValid = ({ input, error, buttonSubmit }) => {
  // заменила на свойство ValidityState 
  if (input.validity.valid) {
    hideInputError({ input, error, buttonSubmit })
  } else {
    showInputError({ input, error, buttonSubmit })
  }
}
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'))
  const buttonSubmit = formElement.querySelector('.form__button')
  inputList.forEach((inputElement) => {
    const errorElement = formElement.querySelector(`#${ inputElement.id }-error`)
    const formElements = {
      input: inputElement,
      error: errorElement,
      buttonSubmit
    }
    inputElement.addEventListener('input', () => {
      isValid(formElements)
    })
  })
}
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'))
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
    })
    setEventListeners(formElement)
  });
};
enableValidation()