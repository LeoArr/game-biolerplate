import { coordToScreen } from "./utils";

class Square {
  constructor(game, position) {
    this.interactable = true
    this.game = game;
    this.position = position;
    this.marked = false;
  }

  draw() {
    this.game.p5.push();
    if (this.marked) {
      this.game.p5.tint(0, 153, 204);
    }
    const pos = coordToScreen(this.position, this.game.state.camera)
    this.game.p5.translate(pos.x, pos.y)
    this.game.p5.image(
      this.game.state.assets.sheets.sprites,
      0, 0,
      16,
      16, // w, h
      0,
      0, // dx, dy
      16,
      16, //dw, dh
      0,
      0, // sx, sy
      16,
      16 // sw, sh
    );
    if (this.id) {
      const color = this.id.split(".")
      this.game.state.mouseMapCanvas.noStroke()
      this.game.state.mouseMapCanvas.fill(color)
      this.game.state.mouseMapCanvas.beginShape()
      this.game.state.mouseMapCanvas.vertex(0, -8)
      this.game.state.mouseMapCanvas.vertex(8, -4)
      this.game.state.mouseMapCanvas.vertex(0, 0)
      this.game.state.mouseMapCanvas.vertex(-8, -4)
      this.game.state.mouseMapCanvas.endShape()
      this.game.state.mouseMapCanvas.image(
        this.game.state.assets.sheets.sprites,
        10, 0,
        16,
        16, // w, h
        0,
        0, // dx, dy
        16,
        16, //dw, dh
        0,
        0, // sx, sy
        16,
        16 // sw, sh
      );
    }
    this.game.p5.pop();
  }
}

function writeColor(image, x, y, red, green, blue, alpha, screen_width) {
  let index = (x + y * screen_width) * 4;
  image.pixels[index] = red;
  image.pixels[index + 1] = green;
  image.pixels[index + 2] = blue;
  image.pixels[index + 3] = alpha;
}

export default Square