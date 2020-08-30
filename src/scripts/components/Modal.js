export default class Modal {
  constructor(modalSelector) {
    this._modalElement = document.querySelector(modalSelector);
  }

  // Метод-обработчик клика на "Escape"
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  
  // Метод, добавляющий слушатели событий
  setEventListeners() {
    this._closeButton = this._modalElement.querySelector('.modal__close-button');
    this._closeButton.addEventListener('click', this.close.bind(this));
    this._modalElement.addEventListener('mousedown', (evt) => {
      if (!evt.target.closest('.modal__container')) {
        this.close();
      }
    });
  }

  // Метод открытия модального окна
  open() {
    this._modalElement.classList.add('modal_active');
    document.body.addEventListener('keydown', this._handleEscape);
  }

  // Метод закрытия модального окна
  close() {
    this._modalElement.classList.remove('modal_active');
    document.body.removeEventListener('keydown', this._handleEscape);
  }
}
