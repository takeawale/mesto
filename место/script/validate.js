//нужный


// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.form')
const formInput = formElement.querySelector('.form__input')
const formError = formElement.querySelector(`#${ formInput.id }-error`)


formElement.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение
  evt.preventDefault()
})

// Слушатель события input
formInput.addEventListener('input', function (evt) {


})


// Функция, которая добавляет класс с ошибкой
const showInputError = ({ input, error, buttonSubmit }) => {
  const errorMessage = input.validationMessage || 'error'


  input.classList.add('form__input_invalid');
  error.textContent = errorMessage
  error.classList.add('form__input-error_active');
  buttonSubmit.disabled = true;
  buttonSubmit.classList.add('form__button_disabled');

}

// Функция, которая удаляет класс с ошибкой
const hideInputError = ({ input, error, buttonSubmit }) => {
  // Находим элемент ошибки

  input.classList.remove('form__input_invalid')
  error.classList.remove('form__input-error_active')
  error.textContent = ''
  buttonSubmit.disabled = false;
  buttonSubmit.classList.remove('form__button_disabled');
}

// Функция, которая проверяет валидность поля
const isValid = ({ input, error, buttonSubmit }) => {
  // проверка валидности
  if (input.value.length > 2) {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError({ input, error, buttonSubmit })
  } else {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError({ input, error, buttonSubmit })
  }
}

formElement.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault()
})


const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.form__input'))
  const buttonSubmit = formElement.querySelector('.form__button')


  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input

    // Находим элемент ошибки внутри самой функции
    const errorElement = formElement.querySelector(`#${ inputElement.id }-error`)

    const formElements = {
      input: inputElement,
      error: errorElement,
      buttonSubmit
    }

    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
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


