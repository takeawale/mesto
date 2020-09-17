import Popup from './popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitHandler) {

        super(popupSelector)
        this._form = this._popup.querySelector('.form');
        this._submitHandler = submitHandler;
        this._submitButton = this._popup.querySelector('.form__button');

    }

    _getInputValues() {

        const inputs = this._form.querySelectorAll('.form__input');
        const formInputValues = {}
        inputs.forEach((input) => {
            formInputValues[input.name] = input.value
        })
        return formInputValues
    }

    setEventListneres() {
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault()

            console.log(this._getInputValues());
            this._submitHandler(this._getInputValues());
            this.close()
        })
        super.setEventListneres()
    }

    close() {
        this._form.reset()
        super.close()


        this._submitButton.classList.add('form__button_disabled')
        this._submitButton.disabled = true;
    }


}