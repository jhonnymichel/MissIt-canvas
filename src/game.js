class Game {
  constructor(area={x: 0, y: 0, width: 200, height: 200}) {
    this.speed = 10;
    this.area = area;
  }

  start() {
    this._intervalId = setInterval(() => this.speed++, 1000 * 10);
  }

  pause() {
    clearInterval(this._intervalId);
  }

  reset() {
    this.pause();
    this.speed = 1;
  }

  get speed() {
    return this._speed;
  }

  set speed(incrementer) {
    if (this._speed >= 30) return;
    window.dispatchEvent(new CustomEvent("speedchanged"));
    this._speed = incrementer;
  }
}

export default Game;
