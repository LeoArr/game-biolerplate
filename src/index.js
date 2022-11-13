import p5 from 'p5';
import Skirmish from './Skirmish';

const containerElement = document.getElementById('p5-container');

const sketch = (p5) => {
  window.p5 = p5
  let x = 100;
  let y = 100;
  let s = new Skirmish()
  var img = null
  p5.setup = function() {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.noSmooth()
    img = p5.loadImage('./assets/cultist2.jpeg')
  };

  p5.draw = function() {
    p5.background(0);
    p5.fill(255);
    p5.rect(x, y, 50, 50);
    s.tick()
    p5.image(img, 200, 200)
  };

  p5.windowResized = function() {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }
};

new p5(sketch, containerElement);