class Game {

  static get SPEED_INTERVAL() {
    return 500;
  }

  static get INITIAL_SPEED() {
    return 5;
  }

  static get SPEED_INCREMENTER() {
    return 0.5;
  }

  constructor(area={x: 0, y: 0, width: 200, height: 200}) {
    this._speed = Game.INITIAL_SPEED;
    this.score = 0;
    this._area = area;
    this.incrementScore = this.incrementScore.bind(this);
    this.startScoring = this.startScoring.bind(this);
    this.stallScore = this.stallScore.bind(this);
    window.addEventListener('startscore', this.startScoring);
    window.addEventListener('stallscore', this.stallScore);
  }

  start() {
    this._intervalId = setInterval(() => this.speed++, Game.SPEED_INTERVAL * 10);
  }

  incrementScore() {
    this.score += 1 + Math.ceil(this.speed - Game.INITIAL_SPEED);
  }

  pause() {
    clearInterval(this._intervalId);
  }

  reset() {
    this.pause();
    this.speed = 1;
  }

  startScoring() {
    if (this._isScoring) return;
    this._isScoring = true;
    this._scoreIntervalId = setInterval(this.incrementScore, 300);
  }

  stallScore() {
    this._isScoring = false;
    clearInterval(this._scoreIntervalId);
  }

  destroy() {
    clearInterval(this._scoreIntervalId);
    clearInterval(this._intervalId);
    window.removeEventListener('startscore', this.startScoring);
    window.removeEventListener('stallscore', this.stallScore);
  }

  get speed() {
    return this._speed;
  }

  set speed(value) {
    if (this._speed >= 30) return;
    window.dispatchEvent(new CustomEvent('speedchanged'));
    this._speed += Game.SPEED_INCREMENTER;
  }
}

export default Game;
