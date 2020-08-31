export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._place = data.place;
    this._link = data.link;
    this._handleCardClick = handleCardClick;

    this._cardSelector = cardSelector;
  }

  // Метод, возвращающий разметку карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    
    return cardElement;
  }

  // Метод-обработчик кнопки "like"
  _handleLike(evt) {
    evt.currentTarget.classList.toggle('card__button_active');
  }

  // Метод-обработчик кнопки "х"
  _handleDelete(evt) {
    // Удаляем элемент из разметки
    evt.target.closest('.card').remove();
    // Удаляем элемент из оперативной памяти
    this._element = null;
  }

  // Метод добавления слушателей событий на кнопки карточки
  _setEventListeners() {
    // Добавляем возможность ставить лайки
    this._element.querySelector('.card__button_act_like').addEventListener('click', evt => {
      this._handleLike(evt);
    });
  
    // Добавляем возможность увеличения картинки
    this._element.querySelector('.card__button_act_enlarge-image').addEventListener('click', element =>{
      this._handleCardClick({ place:this._place, link:this._link });  
    });
  
    //Добавляем возможность удаления карточки
    this._element.querySelector('.card__button_act_delete').addEventListener('click', evt => {
      this._handleDelete(evt);
    });
  }


  // Публичный метод генерации карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    // Наполняем карточку контентом
    const cardImage = this._element.querySelector('.card__image');

    this._element.querySelector('.card__heading').textContent = this._place;
    cardImage.src = this._link;
    cardImage.alt = `${this._place}, фотография`;

    return this._element;
  }
}
