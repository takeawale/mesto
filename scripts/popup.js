export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(popupSelector);
        this._handleEscapeClose = this._handleEscapeClose.bind(this)

    }
    open() {
        this._popup.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscapeClose)
    }
    close() {
        this._popup.classList.remove('popup_opened')
        document.removeEventListener('keydown', this._handleEscapeClose)

    }


    _handleEscapeClose(evt) {
        console.log('click')
        if (evt.key === "Escape") {
            this.close()
            console.log('223')
        }
    }


    setEventListneres() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains("popup") || evt.target.classList.contains('popup__button-cross')) {
                this.close()
            }
        })

    }
}


const handleEscape = (evt) => {

}