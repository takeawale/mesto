export default class FormValidation {
    constructor(settings, form) {
        this._settings = settings;
        this._form = form;
    }

_toggleButtonState({ inputList, buttonSubmit }) { 

    const isValid = inputList.every(input => input.validity.valid);
    if(isValid) {
        buttonSubmit.classList.remove(this._settings.inactiveButtonClass); 
        buttonSubmit.disabled = false; 
        return;
    }
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


