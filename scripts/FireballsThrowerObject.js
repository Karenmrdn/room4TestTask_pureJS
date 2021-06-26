/** @abstract */
class FireballsThrowerObject extends AbstractGameObject {
    checkFireballsPosition(gameState) {
      const fireballs = gameState.objects.filter(
        (object) => object.type === GameObjectType.FIREBALL
      );

      const doesFireballCrossTheObject = fireballs.some(
        fireball => (fireball.x < this.x + this.width / 2
          && fireball.x > this.x - fireball.width + 1
          && fireball.y > this.y - fireball.height / 2
          && fireball.y < this.y + this.height
        ));

      if (fireballs.length && doesFireballCrossTheObject) {
        return this.state = ObjectState.DEAD;
      }
    }

    _throwFireball(gameState) {
      const fireballWidth = GameConst.Fireball.size * 2;        // 60
      const fireballHeight = GameConst.Fireball.size;           // 30

      const fireballX = this._checkDirection(MovementDirection.RIGHT)
        ? this.x + this.width - fireballWidth / 2
        : this.x - GameConst.Fireball.size - fireballWidth / 2;

      const fireballY = this.y + this.height / 2;

      const fireballObj = new FireballObject({
        direction: this.direction,
        speed: GameConst.Fireball.getSpeed(3, 10),
        width: fireballWidth,
        height: fireballHeight,
        x: fireballX,
        y: fireballY,
        angle: -20,
      });

      gameState.objects.push(fireballObj);
    }
  }