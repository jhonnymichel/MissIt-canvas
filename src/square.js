class Square {
  static get SIZE() {
    return 40 * (window.innerWidth / 2500);
  }

  constructor(game, color='#00FF00') {
    this._game = game;
    this._area = game.area;
    this.x = 0;
    this.y = 0;
    this._color = color;
  }

  update(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, Square.SIZE, Square.SIZE);
    ctx.fillStyle = this._color;
    ctx.fill();
  }

  get x() {
    return this._x;
  }

  set x(x) {
    if (x > this._area.x + this._area.width - Square.SIZE) {
      x = this._area.x + this._area.width - Square.SIZE;
    } else if (x < this._area.x) {
      x = this._area.x;
    }
    this._x = x;
  }

  get y() {
    return this._y;
  }

  set y(y) {
    if (y > this._area.y + this._area.height - Square.SIZE) {
      y = this._area.y + this._area.height - Square.SIZE;
    } else if (y < this._area.y) {
      y = this._area.y;
    }
    this._y = y;
  }
}

export default Square;
