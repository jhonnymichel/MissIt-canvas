import Game from './game.js';
import Hero from './hero.js';
import Square from './square.js';
import Enemy from './enemy.js';

class MissIt {

  static get PADDING() {
    return 20;
  }

  constructor() {
    this.bindMethods();

    this.initializeCanvas();
    this.initializeGameObjects();
    this.startGame();
  }

  bindMethods() {
    this.startGame = this.startGame.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.setCanvasSize = this.setCanvasSize.bind(this);
    this.update = this.update.bind(this);
    this.spawnEnemy = this.spawnEnemy.bind(this);
    this.checkCollision = this.checkCollision.bind(this);
  }

  initializeCanvas() {
    this.canvas = document.getElementById('missIt');
    this.ctx = this.canvas.getContext('2d');
    this.setCanvasSize();
    window.addEventListener('resize', this.setCanvasSize);
  }

  initializeGameObjects() {
    this.game = new Game();
    this.game.area = this.area = {
      x: MissIt.PADDING * 2,
      y: MissIt.PADDING * 2,
      width: this.canvas.width - MissIt.PADDING * 4,
      height: this.canvas.height - MissIt.PADDING * 8
    };
    this.enemies = [];
    this.hero = new Hero(this.game, '#00FF00');
    this.hero.x = (this.game.area.width * 0.5) - (Square.SIZE * 0.5);
    this.hero.y = (this.game.area.height * 0.5) - (Square.SIZE * 0.5);
  }

  startGame() {
    window.addEventListener('speedchanged', this.spawnEnemy);
    this.enemies.push(new Enemy(this.game, '#0000FF'));
    this.game.start();
    this.update();
  }

  setCanvasSize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    if (this.game) {
      this.game.area = this.area = {
        x: MissIt.PADDING * 2,
        y: MissIt.PADDING * 2,
        width: this.canvas.width - MissIt.PADDING * 4,
        height: this.canvas.height - MissIt.PADDING * 8
      };
      this.replaceCharactersPositions();
    }
  }

  replaceCharactersPositions() {
    // just trying to set characters position to the same after resize,
    // the internal X and Y setters will keep them inside the new boundaries.
    this.enemies.forEach(enemy => {
      enemy.x = enemy.x;
      enemy.y = enemy.y;
    });

    this.hero.x = this.hero.x;
    this.hero.y = this.hero.y;
  }

  drawBackground() {
    this.ctx.fillStyle = '#FF0000';
    this.ctx.fillRect(MissIt.PADDING, MissIt.PADDING, this.canvas.width - MissIt.PADDING * 2, this.canvas.height - MissIt.PADDING * 6);

    this.ctx.beginPath();
    this.ctx.rect(this.area.x, this.area.y, this.area.width, this.area.height);
    this.ctx.fillStyle = '#eee';
    this.ctx.fill();
  }

  spawnEnemy() {
    this.enemies.push(new Enemy(this.game, '#0000FF'));
  }

  updateGameText() {
    this.ctx.fillStyle = '#fff';
    const scoreBackgroundArea = {
      x: MissIt.PADDING,
      y: MissIt.PADDING * 3 + this.area.height,
      width: this.area.width + MissIt.PADDING * 2,
      height: this.canvas.height - this.area.height - MissIt.PADDING * 2
    }
    this.ctx.fillRect(
      scoreBackgroundArea.x,
      scoreBackgroundArea.y,
      scoreBackgroundArea.width,
      scoreBackgroundArea.height
    );

    this.ctx.fillStyle = '#000';
    this.ctx.font = '80px Arial';
    this.ctx.textAlign='center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(
      this.game.score,
      scoreBackgroundArea.width * 0.5,
      scoreBackgroundArea.y + scoreBackgroundArea.height * 0.45
    );

    if (this._isGameOver) {
      this.ctx.font = '40px Arial';
      this.ctx.fillText(
        'Game Over!\nPress any key to restart!',
        this.canvas.width * 0.5,
        (this.area.height + MissIt.PADDING) * 0.5
      )
    }
  }

  gameOver() {
    this._isGameOver = true;
    this.hero.destroy();
    this.game.destroy();

    window.removeEventListener('resize', this.setCanvasSize);
    window.removeEventListener('speedchanged', this.spawnEnemy);
    window.addEventListener('keypress', this.restartGame);
  }

  restartGame() {
    this._isGameOver = false;

    window.removeEventListener('keypress', this.restartGame);
    this.initializeCanvas();
    this.initializeGameObjects();
    this.startGame();
  }

  checkCollision(enemy) {
    const higherX = Math.max(enemy.x, this.hero.x);
    const lowerX = Math.min(enemy.x, this.hero.x);

    const higherY = Math.max(enemy.y, this.hero.y);
    const lowerY = Math.min(enemy.y, this.hero.y);

    if (higherX - lowerX < Square.SIZE && higherY - lowerY < Square.SIZE) {
      this.gameOver();
    }
  }
  
  update() {
    this.updateGameText();
    if (!this._isGameOver) {
      this.drawBackground();
      this.hero.update(this.ctx);
      this.enemies.forEach(enemy => enemy.update(this.ctx));
      this.enemies.forEach(this.checkCollision);
      requestAnimationFrame(this.update);
    }

  }
}

document.addEventListener('DOMContentLoaded', () => new MissIt());
