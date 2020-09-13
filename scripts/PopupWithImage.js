import Popup from './popup.js';


export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
  super(popupSelector);
  }


  open(link, name) {
      super.open();
    this._popup.querySelector('.popup__image').src = link;
    this._popup.querySelector('.popup__caption').textContent = name;
    console.log('3we')
  }
  
}

