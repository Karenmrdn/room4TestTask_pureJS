const KeyCodes = {
    ESCAPE: 27,
    SPACE: 32,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40,
  };

  const GameFrame = {
    WIDTH: 500,
    HEIGHT: 250,
  };

  const GameObjectType = {
    PLAYER: 0,
    FIREBALL: 1,
    ENEMY: 2,
  };

  const ObjectState = {
    ACTIVE: 0,
    DISPOSED: 1,
    DEAD: 2       // I have added a new ObjectState prop to mark object as dead but not deleted
  };

  const MovementDirection = {
    EMPTY: 0,
    LEFT: 1,
    RIGHT: 2,
    UP: 4,
    DOWN: 8,
  };

  const GameStatus = {
    CONTINUE: 0,
    WIN: 1,
    FAIL: 2,
    PAUSE: 3,
    INTRO: 4,
  };

  const GameConst = {
    Fireball: {
      size: 30,
      getSpeed: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;   // both the maximum and minimum values are included
      }, // TODO [TASK 2.1]
    },
    Player: {
      speed: 2,
      width: 150,
      getHeight: (width) => width,
      getX: (width) => width / 3,
      getY: (height) => height - 150,
    },
    Enemy: {
      speed: 1,
      width: 100,
      height: 82,
      getX: (width) => (width * 2) / 3,
      getY: (height) => height - 82,
    },
  };

  const FLIPPED = "-reversed";

  const GameSpritesData = {
    [GameObjectType.PLAYER]: {
      width: 150,
      height: 150,
      url: "https://interns.room4.team/test-task-v1/player.png",
    },
    [GameObjectType.PLAYER + FLIPPED]: {
      width: 150,
      height: 150,
      url: "https://interns.room4.team/test-task-v1/player-reversed.png",
    },
    [GameObjectType.FIREBALL]: {
      width: 28,
      height: 14,
      url: "https://interns.room4.team/test-task-v1/comet.png",
    },
    [GameObjectType.ENEMY]: {
      width: 78,
      height: 82,
      url: "https://interns.room4.team/test-task-v1/enemy.png",
    },
    [GameObjectType.ENEMY + FLIPPED]: {
      width: 78,
      height: 82,
      url: "https://interns.room4.team/test-task-v1/enemy-reversed.png",
    },
  };

  const GAME_MESSAGES = {
    [GameStatus.WIN]: "You win!\nYeah!",
    [GameStatus.FAIL]: "You loose!",
    [GameStatus.PAUSE]: "Game paused!\nPress Space\nto continue",
    [GameStatus.INTRO]: "Welcome!\nPress Space\nto start the game",
  };

  const GAME_RULES = [
    /**
     * Player dies - game over.
     * @param {Object} gameState
     * @return {GameStatus}
     */
    (gameState) => {
      const player = gameState.objects.filter(
        (object) => object.type === GameObjectType.PLAYER
      )[0];
      return (player.state === ObjectState.DEAD || player.state === ObjectState.DISPOSED)
        ? GameStatus.FAIL
        : GameStatus.CONTINUE;
    },

    /**
     * Pressed ESC button can pause/resume the game
     * @param {Object} gameState
     * @return {GameStatus}
     */
    (gameState) => {
      return gameState.keysPressed.ESC ? GameStatus.PAUSE : GameStatus.CONTINUE;
    },

    /**
     * TODO [TASK 4.1]
     * Demo condition: game round considering as won if thrown fireball shoot the left side of game area
     * @param {Object} gameState
     * @return {GameStatus}
     */
    (gameState) => {
      const enemy = gameState.objects.filter(
        (object) => object.type === GameObjectType.ENEMY
      )[0];

      return enemy.state === ObjectState.DEAD ? GameStatus.WIN : GameStatus.CONTINUE;
    },
  ];

  const onLevelInitialized = (gameState) => {
    const playerObj = new PlayerObject({
      direction: MovementDirection.RIGHT,
      height: GameConst.Player.getHeight(GameConst.Player.width),
      speed: GameConst.Player.speed,
      width: GameConst.Player.width,
      x: GameConst.Player.getX(GameFrame.WIDTH),
      y: GameConst.Player.getY(GameFrame.HEIGHT),
    });

    const enemyObj = new EnemyObject({
      direction: MovementDirection.RIGHT,
      height: GameConst.Enemy.height,
      speed: GameConst.Enemy.speed,
      width: GameConst.Enemy.width,
      x: GameConst.Enemy.getX(GameFrame.WIDTH),
      y: GameConst.Enemy.getY(GameFrame.HEIGHT),
    });

    gameState.objects.push(playerObj);
    gameState.objects.push(enemyObj);
  };