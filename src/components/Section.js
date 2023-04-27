export default class Section {
  //constructor({items, renderer}, selector) {
  constructor({ renderer }, selector) {
    //this._items = items,
    this._renderer = renderer,
    this._container = document.querySelector(selector);
  }

  renderItems(itemsArray)  {
    //this._items.forEach((item) => this._renderer(item));
    itemsArray.forEach((item) => this._renderer(item));
  }

  addItem(item) {
    this._renderer(item);
  }
}