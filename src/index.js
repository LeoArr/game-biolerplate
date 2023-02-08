import p5 from "p5";
import Game from "./src/Game";
import { connect } from "./src/socket";

//https://github.com/aferriss/p5jsShaderExamples
const containerElement = document.getElementById("p5-container");

const sketch = (p5) => {
  window.p5 = p5;
  const gameState = {};
  var game = null;

  p5.preload = function () {
    // shader = p5.loadShader("./assets/shaders/scale.vert", "./assets/shaders/scale.frag")
    const s_img = p5.loadImage("./assets/sprite_sheet.png");
    const i_img = p5.loadImage("./assets/interactable_sheet.png");
    gameState.assets = {
      sheets: {
        sprites: s_img,
        interactable: i_img,
      },
    };
  };

  p5.setup = function () {
    gameState.canvas = p5.createCanvas(
      p5.windowWidth,
      p5.windowHeight,
    );
    gameState.mouseMapCanvas = p5.createGraphics(
      p5.windowWidth,
      p5.windowHeight,
    );
    gameState.mouseMapCanvas.imageMode(p5.CENTER)
    gameState.mouseMapCanvas.noSmooth()
    gameState.mouseMapCanvas.pixelDensity(1)
    p5.imageMode(p5.CENTER);
    p5.noSmooth();
    p5.pixelDensity(1);
    // gameState.socket = connect()
    game = new Game(p5, gameState);
    game.setup();
  };

  p5.mousePressed = function () {
    if (game) {
      game.mousePressed()
    }
  }

  p5.mouseMoved = function () {
    if (game) {
      game.mouseMoved()
    }
  }

  p5.draw = function () {
    if (game) {
      p5.background(200);
      game.draw();
      game.update();
    }
  };

  p5.windowResized = function () {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    game.windowResized();
  };
};

new p5(sketch, containerElement);
