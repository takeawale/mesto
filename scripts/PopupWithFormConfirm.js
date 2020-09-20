
import Popup from './popup.js';

export default class PopupWithFormConfirm extends Popup {

    setEventListneres() {
        this._popup.addEventListener('submit', (event) => {
            event.preventDefault()
            this._submitHandler()
    console.log('submit')
        })
        super.setEventListneres()
    }

setSubmitHandler(action) {

    this._submitHandler = action;


}

}