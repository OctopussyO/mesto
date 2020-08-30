export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  // Метод отрисовки элементов
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  // Метод добавления элементов в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
