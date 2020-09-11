export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  // Метод отрисовки элементов
  renderItems(items = this._renderedItems) {
    items.forEach(item => {
      this._renderer(item);
    });
  }

  // Метод добавления элементов в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
}
