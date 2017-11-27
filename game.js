class Game {
  constructor(area={x: 0, y: 0, width: 200, height: 200}) {
    this._speed = 10;
    this.area = area;
  }

  get speed() {
    return this._speed;
  }

  set speed(incrementer) {
    this._speed += incrementer;
  }
}

export default Game;
