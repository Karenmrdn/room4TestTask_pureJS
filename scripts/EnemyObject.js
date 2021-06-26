class EnemyObject extends FireballsThrowerObject {
    constructor(args) {
      super(args);
      this.type = GameObjectType.ENEMY;
      this.sprite = GameSpritesData[GameObjectType.ENEMY];
    }

    /**
     * @param {Object} gameState
     * @param {number} timeframe
     */
    behave(gameState, timeframe) {
      // TODO [TASK 3.1]

      if (gameState.keysPressed.LEFT && this.x < GameFrame.WIDTH - this.width) {
        this._setDirection(MovementDirection.RIGHT);
        this.x += this.speed * timeframe;
      }

      if (gameState.keysPressed.RIGHT && this.x > 0) {
        this._setDirection(MovementDirection.LEFT);
        this.x -= this.speed * timeframe;
      }

      // TODO [TASK 3.2]

      Math.random() < 0.0055 && this._throwFireball(gameState);

      // TODO [TASK 5.2]

      this.checkFireballsPosition(gameState);
    }
  }