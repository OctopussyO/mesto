import { enlargeImage } from './utils.js';

class Card {
  constructor(name, link, cardSelector) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    
    return cardElement;
  }

  // Метод добавления слушателей событий на кнопки карточки
  _setEventListeners() {
    // Добавляем возможность ставить лайки
    this._element.querySelector('.card__button_act_like').addEventListener('click', evt => {
      evt.currentTarget.classList.toggle('card__button_active')
    });
  
    // Добавляем возможность увеличения картинки
    this._element.querySelector('.card__button_act_enlarge-image').addEventListener('click', evt =>{
      enlargeImage(evt.currentTarget.closest('.card'));
    });
  
    //Добавляем возможность удаления карточки
    this._element.querySelector('.card__button_act_delete').addEventListener('click', evt => {
      evt.target.closest('.card').remove();
    });
  }


  // Публичный метод генерации карточки
  generateCard() {
    console.log(this._element)
    this._element = this._getTemplate();
    this._setEventListeners();

    // Наполняем карточку контентом
    const cardImage = this._element.querySelector('.card__image');

    this._element.querySelector('.card__heading').textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = `${this._name}, фотография`;

    return this._element;
  }

}

export default Card;