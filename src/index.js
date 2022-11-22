import p5 from 'p5';
import Game from './src/Game';

const containerElement = document.getElementById('p5-container');

const sketch = (p5) => {
  window.p5 = p5
  window._tileSize = 16
  const game = new Game()
  var scale = 1

  p5.preload = function() {
    game.preload()
  }
  
  p5.setup = function() {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    // p5.soundFormats("mp3")
    p5.noSmooth()
    p5.frameRate(30)
    game.setup()
  };

  p5.draw = function() {
    p5.background(0);
    scale = Math.floor(Math.min(p5.windowHeight, p5.windowWidth) / 16 / 16)
    const w = (p5.windowWidth - scale*16*16) / 2
    p5.translate(w, 0)
    p5.scale(scale)
    game.draw()
  };
  
  p5.windowResized = function() {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    scale = Math.floor(Math.min(p5.windowHeight, p5.windowWidth) / 16 / 16)
    game.windowResized()
  }

  p5.keyPressed = function() {
    game.keyPressed()
  }
};

new p5(sketch, containerElement);