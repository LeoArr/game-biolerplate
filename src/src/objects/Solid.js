class Solid {
  constructor(position, width, height) {
    this.position = position;
    this.width = width;
    this.height = height;
    this.restitution = 0.2
    this.velocity = {
      x: 0,
      y: 0,
    };
  }

  getMidX() {
    return this.position.x + this.width / 2;
  }
  getMidY() {
    return this.position.y + this.height / 2;
  }

  pointIsInside(point) {
    if (point.x > this.position.x && point.x < this.position.x + this.width) {
      if (
        point.y > this.position.y &&
        point.y < this.position.y + this.height
      ) {
        return true;
      }
    }
    return false;
  }

  collides(otherSolid) {
    return (
      this.position.x + this.width >= otherSolid.position.x &&
      this.position.x <= otherSolid.position.x + otherSolid.width &&
      this.position.y + this.height >= otherSolid.position.y &&
      this.position.y <= otherSolid.position.y + otherSolid.height
    );
  }

  resolveCollision(otherSolid) {
    const tMidX = this.getMidX();
    const tMidY = this.getMidY();
    const oMidX = otherSolid.getMidX();
    const oMidY = otherSolid.getMidY();
    const dx = (oMidX - tMidX) / (otherSolid.width / 2);
    const dy = (oMidY - tMidY) / (otherSolid.height / 2);
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (Math.abs(absDx - absDy) < 0.01) {
      if (dx < 0) {
        // If the player is approaching from positive X
        this.position.x = otherSolid.position.x + otherSolid.width;
      } else {
        // If the player is approaching from negative X
        this.position.x = otherSolid.position.x - this.width;
      }
      if (dy < 0) {
        // If the player is approaching from positive Y
        this.position.y = otherSolid.position.y + otherSolid.height;
      } else {
        // If the player is approaching from negative Y
        this.position.y = otherSolid.position.y - this.height;
      }
      // Randomly select a x/y direction to reflect velocity on
      if (Math.random() < 0.5) {
        this.velocity.x = -this.velocity.x * otherSolid.restitution
      } else {
        this.velocity.y = -this.velocity.y * otherSolid.restitution
      }
    } else if (absDx > absDy) {
      // If the player is approaching from positive X
      if (dx < 0) {
        this.position.x = otherSolid.position.x + otherSolid.width;
      } else {
        // If the player is approaching from negative X
        this.position.x = otherSolid.position.x - this.width;
      }
      
      this.velocity.x = -this.velocity.x * otherSolid.restitution
    } else {
      // If the player is approaching from positive Y
      if (dy < 0) {
        this.position.y = otherSolid.position.y + otherSolid.height;
      } else {
        // If the player is approaching from negative Y
        this.position.y = otherSolid.position.y - this.height;
      }
      this.velocity.y = -this.velocity.y * otherSolid.restitution
    }
  }
}

export default Solid;
