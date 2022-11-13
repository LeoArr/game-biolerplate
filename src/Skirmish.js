class Skirmish {
  constructor() {
    this.players = ["Player1", "Player2"]
  }

  tick() {
    p5.circle(p5.mouseX, p5.mouseY, 20)
  }
}

export default Skirmish