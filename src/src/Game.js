import Square from "./Square";

class Game {
  constructor(p5, state = {}) {
    this.p5 = p5;
    this.state = state;
    this.state.objects = [];
    this.scale = 4;
    this.state.camera = {
      x: -p5.width / 2 / this.scale,
      y: -p5.height / 4 / this.scale,
    };
    this.idCount = 0;
    this.objectIdMap = {};
    this.mouse = {
      x: p5.mouseX,
      y: p5.mouseY
    }
  }

  draw() {
    this.p5.scale(this.scale);
    for (const drawable of this.state.objects) {
      drawable.draw();
      drawable.marked = false
    }
    this.p5.image(this.state.mouseMapCanvas, 0, 0)
  }

  update() {
    const off = (this.p5.mouseY * this.p5.width + this.p5.mouseX) * 4;
    this.state.mouseMapCanvas.loadPixels();
    const id = [
      this.p5.pixels[off],
      this.p5.pixels[off + 1],
      this.p5.pixels[off + 1],
    ].join(".");
    if (this.objectIdMap[id]) {
      this.objectIdMap[id].marked = true;
    }
  }

  mouseMoved() {
    this.mouse.x = this.p5.mouseX
    this.mouse.y = this.p5.mouseY
  }

  mousePressed() {
    const off = (this.p5.mouseY * this.p5.width + this.p5.mouseX) * 4;
    this.p5.loadPixels();
    const id = [
      this.p5.pixels[off],
      this.p5.pixels[off + 1],
      this.p5.pixels[off + 1],
    ].join(".");
    if (this.objectIdMap[id]) {
      this.objectIdMap[id].marked = true;
    }
  }

  windowResized() {}

  setup() {
    const gridSize = 16;
    for (let z = 0; z < 1; z++) {
      for (let i = 0; i < gridSize ** 2; i++) {
        const sqr = new Square(this, {
          x: i % gridSize,
          y: Math.floor(i / gridSize),
          z: Math.random(),
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
}

export default Game;
