import Modal from './Modal.js';

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._modalImage = this._modalElement.querySelector('.modal__image');
    this._modalCaption = this._modalElement.querySelector('.modal__image-caption');
  }

  // Расширение метода открытия модального окна
  open(cardElement) {
    const cardCaption = cardElement.querySelector('.card__heading');
    const cardImage = cardElement.querySelector('.card__image');
    this._modalCaption.textContent = cardCaption.textContent;
    this._modalImage.src = cardImage.src;
    this._modalImage.alt = cardImage.alt;

    super.open();
  }
}
