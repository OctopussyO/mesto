export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._escListener = this._handleEscClose.bind(this);
  }

  // Метод-обработчик клика на "Escape"
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  
  // Метод, добавляющий слушатели событий
  setEventListeners() {
    this._closeButton = this._popupElement.querySelector('.popup__close-button');
    this._closeButton.addEventListener('click', this.close.bind(this));
    this._popupElement.addEventListener('mousedown', (evt) => {
      if (!evt.target.closest('.popup__container')) {
        this.close();
      }
    });
  }

  // Метод открытия модального окна
  open() {
    this._popupElement.classList.add('popup_active');
    document.body.addEventListener('keydown', this._escListener);
  }

  // Метод закрытия модального окна
  close() {
    this._popupElement.classList.remove('popup_active');
    document.body.removeEventListener('keydown', this._escListener);
  }
}
