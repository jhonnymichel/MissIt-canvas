class Square {
  static get SIZE() {
    return 40 * (window.innerWidth / 2500);
  }

  constructor(game, color='#00FF00') {
    this._game = game;
    this._area = game.area;
    this._color = color;
    this.createAxisProperties();
    this.x = 0;
    this.y = 0;
  }

  createAxisProperties() {
    const propertiesToCreate = [
      {name: 'x', side: 'width'},
      {name: 'y', side: 'height'}
    ];
    propertiesToCreate.forEach(axis => {
      Object.defineProperty(this, axis.name, {
        get() {
          return this[`_${axis.name}`];
        },
        set(position) {
          const maxPositionLimit = this._area[axis.name] + this._area[axis.side] - Square.SIZE;
          const minPositionLimit = this._area[axis.name];
          if (position > maxPositionLimit) {
            position = maxPositionLimit;
          } else if (position < minPositionLimit) {
            position = minPositionLimit;
          }
          this[`_${axis.name}`] = position;
        }
      });
    });
  }

  update(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, Square.SIZE, Square.SIZE);
    ctx.fillStyle = this._color;
    ctx.fill();
  }
}

export default Square;
