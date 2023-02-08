/*
 Copyright (C) 2012 by Danny Calleri
 
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */


//the incoming vertex' position
attribute vec4 aPosition;
//and its texture coordinate
attribute vec2 aTexCoord;

// array that contains information on
// sprite
// [0] -> spriteSourceX
// [1] -> spriteSourceY
// [2] -> spriteWidth
// [3] -> spriteHeight
uniform vec4 spriteRect;

// a vec2 that represents sprite position in the world
// [0] -> spriteX
// [1] -> spriteY
uniform vec2 spriteWorld;

// texture width and height
uniform vec2 textureSize;

//the varying statement tells the shader pipeline that this variable
//has to be passed on to the next stage (so the fragment shader)
varying vec2 v_uv;


//the shader entry point is the main method
void main()
{
  gl_Position = aPosition; //copy the position

  // adjust position according to
  // sprite width and height
  gl_Position.x = ((gl_Position.x * spriteRect[2]) + spriteWorld[0]) / (320.0/2.0);
  gl_Position.y = ((gl_Position.y * spriteRect[3]) - spriteWorld[1]) / (480.0/2.0);
  
  // coordinates are being written
  // in homogeneous space, we have
  // to translate the space origin
  // to upper-left corner
  // gl_Position.x -= 0.5;
  // gl_Position.y -= 1.0;
  
  
  // (texCoordX  * spriteWidth / textureWidth) + texSourceX
  v_uv.x = (aTexCoord.x * (spriteRect[2]/textureSize[0])) + spriteRect[0]/textureSize[0];
  // inverting v component
  v_uv.y = ((1.0 - aTexCoord.y) * (spriteRect[3]/textureSize[1])) + spriteRect[1]/textureSize[1];
    
}