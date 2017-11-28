import Square from './square.js';
import Keyboard from './keyboard.js';

class Hero extends Square {
  constructor(game, color) {
    super(game, color);
    this.setMovementAxis = this.setMovementAxis.bind(this);
    this.resetMovementAxis = this.resetMovementAxis.bind(this);
    this.movement = {
      x: 0, y: 0
    };
    this.keysPressed = {
      [Keyboard.DOWN]: false,
      [Keyboard.UP]: false,
      [Keyboard.LEFT]: false,
      [Keyboard.RIGHT]: false
    };
    window.addEventListener('keydown', this.setMovementAxis);
    window.addEventListener('keyup', this.resetMovementAxis);
  }

  setMovementAxis(e) {
    this.keysPressed[e.keyCode] = true;
    switch(e.keyCode) {
      case Keyboard.DOWN:
        this.movement.y = 1;
        break;
      case Keyboard.UP:
        this.movement.y = -1;
        break;
      case Keyboard.LEFT:
        this.movement.x = -1;
        break;
      case Keyboard.RIGHT:
        this.movement.x = 1;
        break;
      default:
        break;
    }
  }

  resetMovementAxis(e) {
    this.keysPressed[e.keyCode] = false;
    switch(e.keyCode) {
      case Keyboard.DOWN:
        this.movement.y = 0;
        if (this.keysPressed[Keyboard.UP]) {
          this.setMovementAxis({keyCode: Keyboard.UP})
        }
        break;
      case Keyboard.UP:
        this.movement.y = 0;
        if (this.keysPressed[Keyboard.DOWN]) {
          this.setMovementAxis({keyCode: Keyboard.DOWN})
        }
        break;
      case Keyboard.LEFT:
        this.movement.x = 0;
        if (this.keysPressed[Keyboard.RIGHT]) {
          this.setMovementAxis({keyCode: Keyboard.RIGHT})
        }
        break;
      case Keyboard.RIGHT:
        this.movement.x = 0;
        if (this.keysPressed[Keyboard.LEFT]) {
          this.setMovementAxis({keyCode: Keyboard.LEFT})
        }
        break;
      default:
        break;
    }
  }

  isCornered() {
    return (
      this._area.x + this._area.width - Square.SIZE === this.x ||
      this._area.y + this._area.height - Square.SIZE === this.y ||
      this._area.x === this.x ||
      this._area.y === this.y
    );
  }

  isStandingStill() {
    return (this.movement.x + this.movement.y === 0);
  };

  update(ctx) {
    this.x += this.movement.x * this._game.speed;
    this.y += this.movement.y * this._game.speed;
    if (this.isCornered() || this.isStandingStill()) {
      window.dispatchEvent(new CustomEvent('stallscore'));
    } else {
      window.dispatchEvent(new CustomEvent('startscore'));
    }
    super.update(ctx);
  }

  destroy() {
    window.removeEventListener('keydown', this.onKeuUp);
  }
}

export default Hero;