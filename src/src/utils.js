const TILE_WIDTH = 16;
const TILE_HEIGHT = 8;

export function multiplyMatrices(A, B) {
  var result = new Array(A.length)
    .fill(0)
    .map((row) => new Array(B[0].length).fill(0));
  return result.map((row, i) => {
    return row.map((val, j) => {
      return A[i].reduce((sum, elm, k) => sum + elm * B[k][j], 0);
    });
  });
}

export const COORD_TO_SCREEN_MATRIX = [
  [TILE_WIDTH / 2, TILE_HEIGHT / 2, 0],
  [-TILE_WIDTH / 2, TILE_HEIGHT / 2, 0],
  [0, -TILE_HEIGHT, 0],
];

export const COORD_TO_SCREEN_MATRIX_INVERSE = [
  [0.0625, -0.0625],
  [0.125, 0.125]
]

export const coordToScreen = (position, camera, p5) => {
  const [[x_screen, y_screen]] = multiplyMatrices(
    [[position.x, position.y, position.z]],
    COORD_TO_SCREEN_MATRIX
  );
  return {
    x: x_screen - camera.x + p5.width/2,
    y: y_screen - camera.y + p5.height/2
  }
};

export const screenToCoord = (position, camera, p5) => {
  const [[x_coord, y_coord]] = multiplyMatrices(
    [[
      (position.x - p5.width/2)/camera.zoom + camera.x,
      (position.y - p5.height/2)/camera.zoom + camera.y + TILE_HEIGHT
    ]],
    COORD_TO_SCREEN_MATRIX_INVERSE
  );
  return {
    x: Math.floor(x_coord),
    y: Math.floor(y_coord)
  }
}
