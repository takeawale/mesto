export default class Card {
    constructor(text, image) {

        this._text = text;
        this._image = image;
    }


    _getTemplate() {

 const cardElement = document
 .querySelector('.card')
 .content
 .querySelector('.elements__item')
 .cloneNode(true);
 

 return cardElement;
    }
}

