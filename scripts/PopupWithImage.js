import Popup from './popup.js';


export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__caption')
  }


  open(link, name) {
    super.open();
    this._popupImage.src = link;
    this._popupCaption.textContent = name;
    console.log('3we')
  }

}