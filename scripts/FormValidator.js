export default class FormValidator {

    constructor ({
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    }, form) {

      this.form = form
      this.inputSelector = inputSelector
      this.submitButtonSelector = submitButtonSelector
      this.inactiveButtonClass = inactiveButtonClass
      this.inputErrorClass = inputErrorClass
      this.errorClass = errorClass

    }


    popupButtonDisabled () {
      console.log(this.data)
    }

    popupButtonAсtive () {
      console.log(this.data)
    }

    hideAllErrors () {
      console.log(this.buttonSubmit)
    }

    _showInputError () {
      console.log(this.buttonSubmit)
    }

    _hideInputError () {
      console.log(this.buttonSubmit)
    }

    _isValid () {
      //_showInputError || _hideInputError
    }


    _setEventListeners () {
      const inputList = Array.from(this.form.querySelectorAll(this.inputSelector))
      this.buttonSubmit = this.form.querySelector(this.submitButtonSelector)

    }

    enableValidation () {
      // конкретная форма
      this.form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners()
    }

}


// 2 экземпляра класса в index.js в глобальной области

// const config = {
//   inputSelector: '.form__input',
//   submitButtonSelector: '.form__button',
//   inactiveButtonClass: 'form__button_disabled',
//   inputErrorClass: 'form__input_type_error',
//   errorClass: 'form__error_visible'
// }

// const addForm = ...
// const editForm = ...

// const addFormValidator = new FormValidator(config, addForm)
// addFormValidator.enableValidation()

// const editFormValidator = new FormValidator(config, editForm)
// editFormValidator.enableValidation()

