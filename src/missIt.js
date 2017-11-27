import Game from './game.js';
import Hero from './hero.js';
import Square from './square.js';
import Enemy from './enemy.js';

class MissIt {
  constructor() {
    this.canvas = document.getElementById('missIt');
    this.ctx = this.canvas.getContext('2d');
    this.startGame = this.startGame.bind(this);
    this.setCanvasSize = this.setCanvasSize.bind(this);
    this.update = this.update.bind(this);
    this.spawnEnemy = this.spawnEnemy.bind(this);
    this.checkCollision = this.checkCollision.bind(this);

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
    this.hero.x = (this.game.area.width * 0.5) - (Square.SIZE * 0.5);
    this.hero.y = (this.game.area.height * 0.5) - (Square.SIZE * 0.5);
    this.enemies = [];

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

  spawnEnemy() {
    this.enemies.push(new Enemy(this.game, '#0000FF'));
  }

  shouldHeroDie() {
    return this._isColliding;
  }

  update() {
    this.drawBackground();
    this.hero.update(this.ctx);
    this.enemies.forEach(enemy => enemy.update(this.ctx));
    this.enemies.forEach(this.checkCollision);
    if (this.shouldHeroDie()) {
      this.gameOver();
    } else {
      requestAnimationFrame(this.update);
    }
  }

  checkCollision(enemy) {
    const higherX = Math.max(enemy.x, this.hero.x);
    const lowerX = Math.min(enemy.x, this.hero.x);

    const higherY = Math.max(enemy.y, this.hero.y);
    const lowerY = Math.min(enemy.y, this.hero.y);

    if (higherX - lowerX < Square.SIZE && higherY - lowerY < Square.SIZE) {
      this._isColliding = true;
    }
  }

  startGame() {
    window.addEventListener('speedchanged', this.spawnEnemy);
    this.enemies.push(new Enemy(this.game, '#0000FF'));
    this.game.start();
    this.update();
  }
}

document.addEventListener('DOMContentLoaded', () => new MissIt());
