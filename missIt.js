import Game from './game.js';
import Hero from './hero.js';
import Square from './square.js';

class MissIt {
  constructor() {
    this.canvas = document.getElementById('missIt');
    this.ctx = this.canvas.getContext('2d');
    this.startGame = this.startGame.bind(this);
    this.setCanvasSize = this.setCanvasSize.bind(this);
    this.update = this.update.bind(this);

    this.setCanvasSize();
    this.game = new Game();
    this.game.area = this.area = {
      x: 40,
      y: 40,
      width: this.canvas.width - 80,
      height: this.canvas.height - 80
    };
    //INSTANCE OUR HERO!
    this.hero = new Hero(this.game, '#00FF00');

    //START THE GAME
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
