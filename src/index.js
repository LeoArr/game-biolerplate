import p5 from 'p5';
import Game from './src/Game';

const containerElement = document.getElementById('p5-container');

const sketch = (p5) => {
  window.p5 = p5
  window._tileSize = 16
  const game = new Game()
  p5.setup = function() {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noSmooth()
    p5.frameRate(30)
    game.setup()
  };

  p5.draw = function() {
    p5.background(0);
    p5.scale(5)
    game.draw()
  };

  p5.windowResized = function() {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    game.windowResized()
  }

  p5.keyPressed = function() {
    game.keyPressed()
  }
};

new p5(sketch, containerElement);