export default class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteClick }, cardSelector) {
    this._place = data.name;
    this._link = data.link;
    this.likes = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;

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
  async _handleLike(evt) {
    await this._handleLikeClick();
    evt.currentTarget.classList.toggle('card__button_active');
  }

  // Метод-обработчик кнопки "х"
  async _handleDelete(evt) {
    await this._handleDeleteClick();
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

  setLikesQuantity() {
    this._element.querySelector('.card__likes_quantity').textContent = this.likes.length;
  }

  // Публичный метод генерации карточки
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    // Наполняем карточку контентом
    const cardImage = this._element.querySelector('.card__image');

    cardImage.src = this._link;
    cardImage.alt = `${this._place}, фотография`;
    this._element.querySelector('.card__heading').textContent = this._place;
    this.setLikesQuantity();

    return this._element;
  }
}

// const bar = () => {
//   console.log('111')
// }

// const fuck = () => new Promise((r) => {
//   setTimeout(r, 3000);
//   console.log('111')
// })

// async function foo () {
//   console.log('000');
//   await fuck();
//   console.log('222');
// }

// foo();