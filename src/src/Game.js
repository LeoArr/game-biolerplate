import Square from "./Square";
import { screenToCoord } from "./utils";

class Game {
  constructor(p5, state = {}) {
    this.p5 = p5;
    this.state = state;
    this.state.objects = [];
    const initialZoom = 4
    this.state.camera = {
      x: 0,
      y: 0,
      zoom: initialZoom,
    };
    this.idCount = 0;
    this.objectIdMap = {};
  }

  draw() {
    this.p5.translate(
      -this.p5.width/2*this.state.camera.zoom,
      -this.p5.height/2*this.state.camera.zoom
    )
    this.p5.scale(this.state.camera.zoom);
    this.p5.translate(
      this.p5.width/2/this.state.camera.zoom,
      this.p5.height/2/this.state.camera.zoom
    )
    for (const drawable of this.state.objects) {
      drawable.draw();
      drawable.marked = false;
    }
  }

  update() {
    const p = screenToCoord(
      {
        x: this.p5.mouseX,
        y: this.p5.mouseY
      },
      this.state.camera,
      this.p5,
    );
    const sqr = this.state.objects.find(
      (sqr) => sqr.position.x === p.x && sqr.position.y === p.y
    );
    if (sqr) {
      sqr.marked = true;
    }
  }

  mousePressed() {
    const p = screenToCoord(
      {
        x: this.p5.mouseX,
        y: this.p5.mouseY
      },
      this.state.camera,
      this.p5,
    );
    const sqr = this.state.objects.find(
      (sqr) => sqr.position.x === p.x && sqr.position.y === p.y
    );
    if (sqr) {
      sqr.playerMarked = true;
    }
  }

  windowResized() {}

  keyPressed(keyCode) {
    if (keyCode === this.p5.LEFT_ARROW) {
      this.state.camera.x -= 40 / this.state.camera.zoom;
    } else if (keyCode === this.p5.RIGHT_ARROW) {
      this.state.camera.x += 40 / this.state.camera.zoom;
    }
    if (keyCode === this.p5.UP_ARROW) {
      this.state.camera.y -= 40 / this.state.camera.zoom;
    } else if (keyCode === this.p5.DOWN_ARROW) {
      this.state.camera.y += 40 / this.state.camera.zoom;
    }
  }

  setup() {
    const gridSize = 16;
    for (let z = 0; z < 1; z++) {
      for (let i = 0; i < gridSize ** 2; i++) {
        const sqr = new Square(this, {
          x: i % gridSize,
          y: Math.floor(i / gridSize),
          z: 0,
        });
        this.addObject(sqr);
      }
    }
  }

  addObject(obj) {
    if (obj.interactable) {
      const id = [
        this.idCount % 255,
        Math.floor(this.idCount / 255) % 255,
        Math.floor(this.idCount / 65025) % 255,
      ];
      obj.id = id.join(".");
      this.objectIdMap[obj.id] = obj;
      this.idCount++;
    }
    this.state.objects.push(obj);
  }

  mouseWheel(event) {
    if (event.delta > 0) {
      this.state.camera.zoom *= 0.5
    } else {
      this.state.camera.zoom /= 0.5
    }
    this.state.camera.zoom = Math.max(Math.min(this.state.camera.zoom, 20), 0.5)
  }
}

export default Game;
