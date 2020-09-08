export default class FormValidation {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
    }
    // _popupButtonDisabled({ input, error, buttonSubmit }) {
    //     buttonSubmit.classList.add(this._settings.inactiveButtonClass);
    //     buttonSubmit.disabled = true;
    // }

    // _popupButtonAсtive({ input, error, buttonSubmit }) {
    //     buttonSubmit.classList.remove(this._settings.inactiveButtonClass);
    //     buttonSubmit.disabled = false;
    // }

  // в агрументах передаем все инпуты и кнопку 
_toggleButtonState({ inputList, buttonSubmit }) { 
    // проверяем если все они валидные, то isValid будет true, если нет - false
    const isValid = inputList.every(input => input.validity.valid);
    // если валидные то кнопку делаем активной и выходим из функции
    if(isValid) {
        buttonSubmit.classList.remove(this._settings.inactiveButtonClass); 
        buttonSubmit.disabled = false; 
        return;
    }
   // если не все валидные, то падаем сюда и делаем ее неактивной
    buttonSubmit.classList.add(this._settings.inactiveButtonClass); 
    buttonSubmit.disabled = true; 
} 
    _showInputError({ input, error, buttonSubmit }) {
        const errorMessage = input.validationMessage || "error";
        input.classList.add(this._settings.inputErrorClass);
        error.textContent = errorMessage;
        error.classList.add(this._settings.errorClass);

    }

    _hideInputError({ input, error, buttonSubmit }) {
        input.classList.remove(this._settings.inputErrorClass);
        error.classList.remove(this._settings.errorClass);
        error.textContent = "";

    }
    _isValid(formElements) {

        if (formElements.input.validity.valid) {
            this._hideInputError(formElements);
        } else {
            this._showInputError(formElements);
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        const buttonSubmit = this._form.querySelector(this._settings.submitButtonSelector);
        inputList.forEach((inputElement) => {
            const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
            const formElements = {
                input: inputElement,
                error: errorElement,
                buttonSubmit,
            };
            inputElement.addEventListener("input", () => { 
                this._isValid(formElements); 
                this._toggleButtonState({ inputList, buttonSubmit })
             });
        });
    }
    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners(this._form);

    }
}


