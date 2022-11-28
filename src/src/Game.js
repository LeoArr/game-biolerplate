import Canon from "./objects/Canon"
import Floor from "./objects/Floor"
import NorthWall from "./objects/NorthWall"
import Player from "./objects/Player"
import Wall from "./objects/Wall"

import {Howl} from 'howler';
import Door from "./objects/Door"
import Button from "./objects/Button"
import Spikes from "./objects/Spikes"
import Fire from "./objects/Fire"
import Snake from "./objects/Snake"
import Computer from "./objects/Computer"
import SoundIcon from "./objects/SoundIcon"
import Stomp from "./objects/Stomp"
import Light from "./objects/Light"
import Exit from "./objects/Exit"

class Game {
  constructor() {
    this.state = {}
    this.fonts = {}
    this.sounds = {
      on: true
    } 
    this.timer = 0
    this.gameEnd = 600
    this.objects = []
    this.resetGame()
    this.playerDead = false
    this.win = false
  }

  draw() {
    if (this.timer === 1) {
      this.sounds.button.play()
    }
    if (this.playerDead) {
      this.drawDeathScreen()
    } else if (this.win) {
      this.drawWinScreen()
    } else {
      this.objects.map((o) => o.draw())
      this.player.draw()
      this.popups.map((o) => o.draw())
      if (this.timer >= this.gameEnd) {
        this.playerDeath()
      } else {
        this.timer++
      }
      if (this.stompStartTime) {
        if ((this.timer - this.stompStartTime) % 60 === 0) {
          this.stompTime()
        }
      }
    }
    this.drawTopInfo()
  }

  playerWin() {
    this.win = true
  }

  drawDeathScreen() {
    p5.push()
    p5.textSize(10)
    const f = Math.floor(255 * (1 - Math.pow(this.timer/this.gameEnd, 2)))
    p5.fill(255, f, f)
    p5.textFont(this.fonts.display)
    p5.text("You died press 'R' to retry.", 0, p5.windowHeight/2/scale)
    p5.pop()
  }

  drawWinScreen() {
    p5.push()
    p5.textSize(10)
    const f = Math.floor(255 * (1 - Math.pow(this.timer/this.gameEnd, 2)))
    p5.fill(255, f, f)
    p5.textFont(this.fonts.display)
    p5.text("Congratulations! You did it!", 0, p5.windowHeight/2/scale)
    p5.pop()
  }

  drawTopInfo() {
    p5.push()
    p5.textSize(10)
    const f = Math.floor(255 * (1 - Math.pow(this.timer/this.gameEnd, 2)))
    p5.fill(255, f, f)
    p5.textFont(this.fonts.display)
    const timeLeft = ((this.gameEnd - this.timer) / 30).toFixed(2)
    const seconds = Math.floor(timeLeft)
    const notSeconds = Math.floor((timeLeft * 100) % 100)
    p5.text(`${seconds < 10 ? "0": ""}${seconds}:${notSeconds < 10 ? "0": ""}${notSeconds}`, 0, 12)
    p5.pop()
  }

  keyPressed() {
    if (p5.keyCode === 82) {
      this.resetGame()
    }
  }

  windowResized() {

  }

  playerDeath() {
    this.sounds.oof.play()
    this.playerDead = true
  }

  resetGame() {
    p5.noLoop()
    this.playerDead = false
    this.win = false
    Object.values(this.sounds).map((s) =>typeof s == "object" && s.stop())
    this.state = {
      firstDoor: true,
      secondDoor: true,
      thirdDoor: true,
      fourthDoor: true,
      lights: 0
    }
    this.timer = 0
    this.gameEnd = 30*20
    this.objects = []
    this.popups = []
    for (var i = 0; i < 16; i++) {
      for (var j = 9; j < 16; j++) {
        if (j === 1 || i === 0 || j === 15 || i === 15) {
          this.objects.push(new NorthWall(this, {x: i, y: j}))
        } else {
          this.objects.push(new Floor(this, {x: i, y: j}))
        }
      }
    }

    this.objects.push(new NorthWall(this, {x: 5, y: 13}))
    this.objects.push(new NorthWall(this, {x: 5, y: 12}))
    this.objects.push(new Door(this, {x: 4, y: 12}, "secondDoor"))
    this.objects.push(new NorthWall(this, {x: 3, y: 12}))
    this.objects.push(new NorthWall(this, {x: 2, y: 12}))
    this.objects.push(new NorthWall(this, {x: 1, y: 12}))
    this.objects.push(new NorthWall(this, {x: 12, y: 12}))
    this.objects.push(new NorthWall(this, {x: 12, y: 11}))
    this.objects.push(new NorthWall(this, {x: 12, y: 10}))
    this.objects.push(new NorthWall(this, {x: 12, y: 9}))
    this.objects.push(new NorthWall(this, {x: 13, y: 9}))
    this.objects.push(new NorthWall(this, {x: 14, y: 9}))
    this.objects.push(new Fire(this, {x: 2, y: 14}))
    this.objects.push(new Fire(this, {x: 3, y: 14}))
    this.objects.push(new Fire(this, {x: 14, y: 11}))
    this.objects.push(new Fire(this, {x: 3, y: 11}))
    this.objects.push(new Canon(this, {x: 1, y: 14}, 45))
    this.objects.push(new Door(this, {x: 5, y: 14}, "firstDoor"))
    this.objects.push(new Door(this, {x: 5, y: 11}, "thirdDoor"))
    this.objects.push(new Door(this, {x: 10, y: 9}, "fourthDoor"))
    this.objects.push(new NorthWall(this, {x: 5, y: 10}))
    this.objects.push(new Computer(this, {x: 1, y: 10}))
    this.objects.push(new NorthWall(this, {x: 1, y: 9}))
    this.objects.push(new NorthWall(this, {x: 2, y: 9}))
    this.objects.push(new NorthWall(this, {x: 3, y: 9}))
    this.objects.push(new NorthWall(this, {x: 4, y: 9}))
    this.objects.push(new NorthWall(this, {x: 5, y: 9}))
    this.objects.push(new NorthWall(this, {x: 6, y: 9}))
    this.objects.push(new NorthWall(this, {x: 7, y: 9}))
    this.objects.push(new NorthWall(this, {x: 8, y: 9}))
    this.objects.push(new NorthWall(this, {x: 9, y: 9}))
    this.objects.push(new NorthWall(this, {x: 11, y: 9}))
    for (var i = 1; i < 9; i++) {
      this.objects.push(new NorthWall(this, {x: 11, y: i}))
      this.objects.push(new NorthWall(this, {x: 9, y: i}))
      this.objects.push(new Floor(this, {x: 10, y: i}))
    }
    this.objects.push(new Light(this, {x: 9, y: 9}, 4))
    this.objects.push(new Light(this, {x: 8, y: 9}, 3))
    this.objects.push(new Light(this, {x: 7, y: 9}, 2))
    this.objects.push(new Light(this, {x: 6, y: 9}, 1))
    this.soundIcon = new SoundIcon(this, {x: 15, y: 0})
    this.objects.push(this.soundIcon)
    this.objects.push(new Snake(this, {x: 14, y: 13}))
    this.objects.push(new Button(this, {x: 1, y: 13}, () => {
      this.state.firstDoor = false
      firstSpikes.map((s, i) => s.updateTriggerTime(this.timer + 40 + i * 2))
    }))
    this.objects.push(new Button(this, {x: 6, y: 10}, () => {
      this.lightsButton()
    }))
    this.objects.push(new Button(this, {x: 6, y: 12}, () => {
      this.lightsButton()
    }))
    this.objects.push(new Button(this, {x: 11, y: 10}, () => {
      this.lightsButton()
    }))
    this.objects.push(new Button(this, {x: 11, y: 12}, () => {
      this.lightsButton()
    }))
    const spikeStart = 601
    const firstSpikes = []
    this.objects.push(new Button(this, {x: 14, y: 10}, () => {
      firstSpikes.reverse().map((s, i) => s.updateTriggerTime(this.timer + 55 + i * 2, true))
      this.state.secondDoor = false
    }))
    this.objects.push(new Exit(this, {x: 9, y: 1}))
    for (var i = 0; i < 9; i++) {
      if (i < 8) {
        this.objects.push(new NorthWall(this, {x: 6 + i, y: 13}))
      }
      const sp = new Spikes(this, {x: 6 + i, y: 14}, spikeStart + 3 * i)
      this.objects.push(sp)
      firstSpikes.push(sp)
    }
    // this.player = new Player(this, {x: 4.2, y: 11})
    this.player = new Player(this, {x: 4.2, y: 14.3})
    p5.loop()
  }

  lightsButton() {
    this.state.lights += 1
    if (this.state.lights === 4) {
      this.state.fourthDoor = false
      this.stompStartTime = null
    }
  }

  popupsDone() {
    this.stompTime()
    this.stompStartTime = this.timer
  }

  stompTime() {
    const stomps = []
    while (stomps.length < 4) {
      const c = Math.floor(Math.random() * 18)
      if (!stomps.includes(c)) {
        stomps.push(c)
      }
    }
    stomps.map((p, i) => {
      setTimeout(() => {
        this.objects.push(new Stomp(this, {x: 6 + (p % 6), y: 10 + Math.floor(p/6)}))
      }, 300*i)
    })
  }

  setup() {
  }
  
  preload() {
    this.spriteSheet = p5.loadImage('./assets/m1.png')
    this.fonts.display = p5.loadFont("./assets/fonts/display.ttf")
    this.sounds.canon = new Howl({
      src: ['./assets/sounds/canon.mp3']
    });
    this.sounds.fuse = new Howl({
      src: ['./assets/sounds/fuse.mp3']
    });
    this.sounds.click = new Howl({
      src: ['./assets/sounds/click.mp3']
    });
    this.sounds.door = new Howl({
      src: ['./assets/sounds/door.mp3']
    });
    this.sounds.button = new Howl({
      src: ['./assets/sounds/button.mp3']
    });
    this.sounds.oof = new Howl({
      src: ['./assets/sounds/oof.mp3']
    });
    this.sounds.thump = new Howl({
      src: ['./assets/sounds/thump.mp3']
    });
    this.sounds.fireMagic = new Howl({
      src: ['./assets/sounds/fire-magic.mp3']
    });
  }

  mouseClicked() {
    const mouseX = (p5.mouseX - x_offset) / scale / 16
    const mouseY = (p5.mouseY) / scale / 16
    if (this.pointIsInside(this.soundIcon, {x: mouseX, y: mouseY})) {
      this.sounds.on = !this.sounds.on
      Object.values(this.sounds).map((s) =>typeof s == "object" && s.volume(this.sounds.on ? 1 : 0))
    }
    for (const popup of [...this.popups].reverse()) {
      if (this.pointIsInside(popup, {x: mouseX, y: mouseY})) {
        this.popups = this.popups.filter((p) => p !== popup)
        this.sounds.click.play()
        if (this.popups.length === 0) {
          this.popupsDone()
        }
        return
      }
    }
  }

  pointIsInside(obj, point) {
    if (point.x > obj.position.x && point.x < obj.position.x + obj.width) {
      if (
        point.y > obj.position.y &&
        point.y < obj.position.y + obj.height
      ) {
        return true;
      }
    }
    return false;
  }
}

export default Game