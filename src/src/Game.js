import Canon from "./objects/Canon"
import Floor from "./objects/Floor"
import NorthWall from "./objects/NorthWall"
import Player from "./objects/Player"
import Wall from "./objects/Wall"

class Game {
  constructor(state = {}) {
    this.timer = 0
    this.gameEnd = 30*20
    this.objects = []
    this.resetGame()
  }

  draw() {
    this.objects.map((o) => o.draw())
    this.player.draw()
    this.timer++
    if (this.timer >= this.gameEnd) {
      console.log("End")
    }
  }

  keyPressed() {
    
  }

  windowResized() {

  }

  playerDeath() {
    this.resetGame()
  }

  resetGame() {
    this.timer = 0
    this.gameEnd = 30*20
    this.objects = []
    for (var i = 0; i < 16; i++) {
      for (var j = 0; j < 16; j++) {
        if (j === 0 || i === 0 || j === 15 || i === 15) {
          this.objects.push(new Wall(this, {x: i, y: j}))
        } else {
          this.objects.push(new Floor(this, {x: i, y: j}))
        }
      }
    }
    this.objects.push(new NorthWall(this, {x: 5, y: 14}))
    this.objects.push(new NorthWall(this, {x: 5, y: 12}))
    this.objects.push(new NorthWall(this, {x: 4, y: 12}))
    this.objects.push(new NorthWall(this, {x: 3, y: 12}))
    this.objects.push(new NorthWall(this, {x: 2, y: 12}))
    this.objects.push(new NorthWall(this, {x: 1, y: 12}))
    this.objects.push(new Canon(this, {x: 1, y: 14}))
    this.player = new Player(this, {x: 4, y: 14})
  }

  setup() {
    this.spriteSheet = p5.loadImage('./assets/m1.png')
    this.sounds = {}
    // this.sounds.canon = p5.loadSound("./assets/sounds/canon.mp3")
  }
  
  preload() {
  }
}

export default Game