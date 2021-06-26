class FireballObject extends AbstractGameObject {
    constructor(args) {
      super(args);
      this.type = GameObjectType.FIREBALL;
      this.sprite = GameSpritesData[GameObjectType.FIREBALL];
    }

    /**
     * TODO [TASK 2.2]
     * @param {Object} gameState
     * @param {number} timeframe
     */
    behave(gameState, timeframe) {
      const gravCoef = Math.random() * (1.015 - 1.001) + 1.001;   // only min value included

      if (this._checkDirection(MovementDirection.LEFT)) {
        this.x -= this.speed * timeframe;
        this.y = this.y * gravCoef;
      }

      if (this._checkDirection(MovementDirection.RIGHT)) {
        this.x += this.speed * timeframe;
        this.y = this.y * gravCoef;
      }

      if (this.x < 0 || this.x > GameFrame.WIDTH) {
        this.state = ObjectState.DISPOSED;
      }
    }
  }