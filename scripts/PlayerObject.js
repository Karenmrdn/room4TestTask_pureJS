class PlayerObject extends FireballsThrowerObject {
    constructor(args) {
      super(args);
      this.type = GameObjectType.PLAYER;
      this.sprite = GameSpritesData[GameObjectType.PLAYER];
    }

    /**
     * @param {Object} gameState
     * @param {number} timeframe
     */
    behave(gameState, timeframe) {
      // TODO [TASK 5.1]

      this.checkFireballsPosition(gameState);

      // TODO [TASK 1.1]

      if (gameState.keysPressed.UP && this.y > 0) {
        this._setDirection(MovementDirection.UP);
        this.y -= this.speed * timeframe * 2;
      }

      if (!gameState.keysPressed.UP) {
        if (this.y < GameFrame.HEIGHT - this.height + 15) {
          this._setDirection(MovementDirection.DOWN);
          this.y += this.speed * timeframe;       // I just speeded up the falling process
        }
      }

      // TODO [TASK 1.4]

      if (this.y < 0) {
        this.y = 0;
      }

      // TODO [TASK 1.2]

      if (gameState.keysPressed.RIGHT && this.x < GameFrame.WIDTH - this.width) {
        this._setDirection(MovementDirection.RIGHT);
        this.x += this.speed * timeframe;
      }

      if (gameState.keysPressed.LEFT && this.x > 0) {
        this._setDirection(MovementDirection.LEFT);
        this.x -= this.speed * timeframe;
      }

      if (gameState.keysPressed.SHIFT) {
        gameState.keysPressed.SHIFT = false;
        this._throwFireball(gameState);
      }
    }
  }