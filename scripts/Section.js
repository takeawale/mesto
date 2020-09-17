export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._containerSelector = containerSelector;
        this._sectionElement = document.querySelector(containerSelector);
    }

    renderItems() {
        this._items.forEach((currentData) => {
            this._renderer(currentData)
        })
    }

    addItem(card, isArray) {
        if(isArray) {
            this._sectionElement.append(card)
        } else {
            this._sectionElement.prepend(card)
        }
        
    }
}

