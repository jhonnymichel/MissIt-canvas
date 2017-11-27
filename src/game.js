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
    this.area = area;
    window.addEventListener('incrementscore', this.incrementScore.bind(this))
  }

  start() {
    this._intervalId = setInterval(() => this.speed++, Game.SPEED_INTERVAL * 10);
  }

  pause() {
    clearInterval(this._intervalId);
  }

  reset() {
    this.pause();
    this.speed = 1;
  }

  incrementScore() {
    this.score++;
  }

  get speed() {
    return this._speed;
  }

  set speed(value) {
    if (this._speed >= 30) return;
    window.dispatchEvent(new CustomEvent('incrementscore'));
    window.dispatchEvent(new CustomEvent('speedchanged'));
    this._speed += Game.SPEED_INCREMENTER;
  }
}

export default Game;
