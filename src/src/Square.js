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
    if (this.playerMarked) {
      this.game.p5.tint(255, 153, 204);
    }
    if (this.otherPlayerMarked) {
      this.game.p5.tint(128);
    }
    const pos = coordToScreen(this.position, this.game.state.camera, this.game.p5)
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
    this.game.p5.pop();
  }
}

export default Square