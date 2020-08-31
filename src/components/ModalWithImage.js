import Modal from './Modal.js';

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._modalImage = this._modalElement.querySelector('.modal__image');
    this._modalCaption = this._modalElement.querySelector('.modal__image-caption');
  }

  // Расширение метода открытия модального окна
  open(data) {
    this._modalCaption.textContent = data.place;
    this._modalImage.src = data.link;
    this._modalImage.alt = `${data.place}, фотография`;

    super.open();
  }
}
