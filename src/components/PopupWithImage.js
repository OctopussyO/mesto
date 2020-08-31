import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupCaption = this._popupElement.querySelector('.popup__image-caption');
  }

  // Расширение метода открытия модального окна
  open(data) {
    this._popupCaption.textContent = data.place;
    this._popupImage.src = data.link;
    this._popupImage.alt = `${data.place}, фотография`;

    super.open();
  }
}
