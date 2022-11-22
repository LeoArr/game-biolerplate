class Solid {
  constructor(position, width, height) {
    this.position = position
    this.width = width
    this.height = height
  }

  pointIsInside(point) {
    if (point.x > this.position.x && point.x < this.position.x + this.width) {
      if (point.y > this.position.y && point.y < this.position.y + this.height) {
        return true
      }
    }
    return false
  }
  
  collides(otherSolid) {
    return this.position.x + this.width > otherSolid.position.x &&
      this.position.x < otherSolid.position.x + otherSolid.width &&
      this.position.y + this.height > otherSolid.position.y &&
      this.position.y < otherSolid.position.y + otherSolid.height
  }
}

export default Solid