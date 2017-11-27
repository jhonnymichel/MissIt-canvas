class Game {

  static get SPEED_INTERVAL() {
    return 500;
  }

  static get INITIAL_SPEED() {
    
  }

  constructor(area={x: 0, y: 0, width: 200, height: 200}) {
    this.speed = 10;
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

  set speed(incrementer) {
    if (this._speed >= 30) return;
    window.dispatchEvent(new CustomEvent('incrementscore'));
    window.dispatchEvent(new CustomEvent('speedchanged'));
    this._speed = incrementer;
  }
}

export default Game;
