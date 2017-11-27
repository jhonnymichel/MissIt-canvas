import Square from './square.js';

class Enemy extends Square {
  constructor(game, color) {
    super(game, color);
    this.movement = {
      x: this.getInitialAxis(), y: this.getInitialAxis()
    };
  }

  getInitialAxis() {
    const random = Math.ceil(Math.random() * 2);
    return (random === 1 ? 1 : -1);
  }

  update(ctx) {
    const currentX = this.x;
    const currentY = this.y;
    this.x += this.movement.x * this._game.speed;
    this.y += this.movement.y * this._game.speed;

    if (this.x === currentX) {
      this.movement.x *= -1;
    }

    if (this.y === currentY) {
      this.movement.y *= -1;
    }

    super.update(ctx);
  }
}

export default Enemy;