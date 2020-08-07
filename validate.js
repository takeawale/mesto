
// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');
const formError = formElement.querySelector(`#${formInput.id}-error`);


formElement.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение
  evt.preventDefault();
});

// Слушатель события input
formInput.addEventListener('input', function (evt) {


});


// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, buttonSubmit, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);


  // Остальной код такой же
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
  buttonSubmit.disabled = false;
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, buttonSubmit, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
  buttonSubmit.disabled = true;
};

// Функция, которая проверяет валидность поля
const isValid = (buttonSubmit, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // showInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    showInputError(formElement, inputElement,  buttonSubmit,inputElement.validationMessage);
  } else {
    // hideInputError теперь получает параметром форму, в которой
    // находится проверяемое поле, и само это поле
    hideInputError(formElement, buttonSubmit, inputElement);
  }
};
 
formElement.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});


const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  const buttonSubmit = formElement.querySelector('.form__button');


  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement)
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll('.form'));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });

    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// Вызовем функцию
enableValidation();


/*

const object = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  errorClass: "form__error",
  inactiveButtonClass: "form__button_disabled",
  activeButtonClass: "form__button_udisabled",
  inputErrorClass: "form__input_invalid",
  inputValidclass: "form__input_valid"
  
  }

  
  const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, 
    inputErrorClass,  errorClass, activeButtonClass, inactiveButtonClass, 
      inputValidclass }) => {

        const forms = Array.from(document.querySelectorAll(formSelector));
        forms.forEach((formSelector) => {
          formSelector.addEventListener('submit', function (evt) {
            // Отменим стандартное поведение по сабмиту
            evt.preventDefault();
          });
        });

// Функция, которая добавляет класс с ошибкой
const showInputError = (formSelector, inputSelector, errorMessage) => {
  const errorElement = formSelector.querySelector(`#${inputSelector.id}-error`);
  inputSelector.classList.add('form__input_invalid');
// Заменим содержимое span с ошибкой на переданный параметр
errorElement.textContent = errorMessage;
errorElement.classList.add('form__input-error_active');
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  const errorElement = formElement.querySelector(`#${inputSelector.id}-error`);
  element.classList.remove('form__input_invalid');
  // Скрываем сообщение об ошибке
  errorClass.classList.remove('form__input-error_active');
  errorClass.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (formSelector, inputSelector) => {
  if (!inputSelector.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formSelector, inputSelector, inputSelector.validationMessage);
    
  } else {
    // Если проходит, скроем
    hideInputError(formSelector, inputSelector);
  }
};  


  inputList.forEach((inputSelector) => {
    // каждому полю добавим обработчик события input
    inputSelector.addEventListener('input', () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formSelector, inputSelector)
    });
  });
     
      }

      enableValidation();



*/




