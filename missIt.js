class Keyboard {
  get DOWN() {
    return 40;
  }
  get UP() {
    return 38;
  }
  get LEFT() {
    return 37;
  }
  get RIGHT() {
    return 39;
  }
}

class Square {
  static get SIZE() {
    return 20;
  }

  constructor(area, color) {
    this._area = area;
    this.x = 0;
    this.y = 0;
    this._color = color || '#00FF00';
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
    if (x > this._area.width - Square.SIZE) {
      x = this._area.width - Square.SIZE;
    } else if (x < this._area.x) {
      x = this._area.x;
    }
    this._x = x;
  }

  get y() {
    return this._y;
  }

  set y(y) {
    if (y > this._area.height - 20) {
      y = this._area.height - 20;
    } else if (y < this._area.y) {
      y = this._area.y;
    }
    this._y = y;
  }
}

class MissIt {
  constructor() {
    this.canvas = document.getElementById('missIt');
    this.ctx = this.canvas.getContext('2d');
    this.startGame = this.startGame.bind(this);
    this.setCanvasSize = this.setCanvasSize.bind(this);
    this.update = this.update.bind(this);

    this.setCanvasSize();
    this.area = {
      x: 40,
      y: 40,
      width: this.canvas.width - 80,
      height: this.canvas.height - 80
    }
    //INSTANCE OUR HERO!
    this.hero = new Square(this.area);
    this.startGame();
    window.addEventListener('resize', this.setCanvasSize);
  }

  setCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  drawBackground() {
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(20, 20, this.canvas.width - 40, this.canvas.height - 40);

    this.ctx.beginPath();
    this.ctx.rect(this.area.x, this.area.y, this.area.width, this.area.height);
    this.ctx.fillStyle = '#FFF';
    this.ctx.fill();
  }

  gameOver() {
    // nothing happens so far
  }

  shouldHeroDie() {
    return false;
  }

  update() {
    this.drawBackground();
    this.hero.update(this.ctx);
    if (this.shouldHeroDie()) {
      this.gameOver();
    } else {
      requestAnimationFrame(this.update);
    }
  }

  startGame() {
    this.update();
  }
}

document.addEventListener('DOMContentLoaded', () => new MissIt());