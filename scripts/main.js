"use strict";

window.GAME = (() => {
  const game = new Game(
    document.querySelector("#game-area"),
    GAME_RULES,
    onLevelInitialized
  );

  window.restartGame = () => {
    game.initializeLevelAndStart();
    game.setGameStatus(GameStatus.INTRO);
  };

  window.restartGame();

  return game;
})();
