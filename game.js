/**
  =================================================================
                            Exercise One
                               game.js
  =================================================================
  
    This is the main game file for Exercise One.
    
    Team 3: Ryan Wahl, Jacob Bell, Jacqueline Salamanca, Charmi Patel.
  
    Sound effects obtained from https://www.zapsplat.com
*/


/**
  This enum defines the possible game states.
*/
const GameState = {
  PreStart: 0,
  PreAnimation: 1,
  InGame: 2,
  WonAnimatin: 3,
  End: 4
}

/**
    ================
    Game Variables
    ================
*/
// The current level.
let level = 0;
// The list of meshes to render.
let renderList = [];
// The level list.
let levelList = [];
// the time remaining.
let timeRemaining = 90;
// The current game state.
let gameState = GameState.PreStart;
// The current level.
let currentLevel;
// if the player has clicked the player mesh.
let isPlayerClicked = false;
let gameOver = false;

// If the game is in level infinity.
let isLevelInfinity = false;
let infiniteIterationCount = 0;

let passSound;
let failSound;
let gameSoundOne;

function preload(){
  passSound = loadSound('pass.mp3');
  failSound = loadSound('fail.mp3');
  gameSoundOne = loadSound('Background_PartOne.wav');
}

/**
  Setup the canvas.
*/
function setup() {
  createCanvas(800, 450);
  
  // Add levels to the level list.
  levelList.push(new LevelTen());
  levelList.push(new LevelNine());
  levelList.push(new LevelEight());
  levelList.push(new LevelSeven());
  levelList.push(new LevelSix());
  levelList.push(new LevelFive());
  levelList.push(new LevelFour());
  levelList.push(new LevelThree());
  levelList.push(new LevelTwo());
  levelList.push(new LevelOne());
  // Setup the sounds.
  passSound.setVolume(0.3);
  failSound.setVolume(0.3);
  gameSoundOne.setVolume(0.1);
  gameSoundOne.loop();
  
}


/**
  Handles the rendering of the system.
*/
function render(){
  background(255);
  
  for(let item of renderList){
    item.render();
  }
  
  resetMatrix();
  textSize(20)
  fill(0,0,0);
  noStroke();
  text("Time: " + Math.trunc(timeRemaining), width-80, 20);
  if(currentLevel != null)
    text(currentLevel.name, 10, 20);
}


let animationTimer = 0;
let gameOverString = "";
let currentIndex = 0;

/**
  Handles the game logic.
*/
function update(){
  /**
    This state occures when the levels are chaninging or when the game first starts.
  */
  if(gameState == GameState.PreStart){
    currentLevel = levelList.pop();
    if(currentLevel == null){
      currentLevel = new LevelInfinity(infiniteIterationCount++);
      if(!isLevelInfinity)
        timeRemaining = currentLevel.time;
      isLevelInfinity = true;
    }
    renderList = [];
    gameState = GameState.PreAnimation;
    gameOverString = "";
    animationTimer = isLevelInfinity ? 70 : 100;
    currentIndex = 0;
  }
  /**
    This state occurs during the Level Name animation.
  */
  else if(gameState == GameState.PreAnimation){
    animationTimer -= deltaTime;
    if(currentIndex < currentLevel.name.length){
      if(animationTimer < 0){
        gameOverString += currentLevel.name[currentIndex];
        currentIndex++;
        animationTimer = 150;
      }
    }
    resetMatrix();
    textSize(50);
    fill(0,0,0);
    noStroke();
    text(gameOverString, width/2-120, height/2);
    if(currentIndex >= currentLevel.name.length && animationTimer < 0){
      setupLevel(currentLevel);
      if(!isLevelInfinity)
        timeRemaining = currentLevel.time;
      gameState = GameState.InGame;
    }
  }
  /**
    This state handles all game actions.
  */
  else if(gameState == GameState.InGame){
    timeRemaining -= deltaTime/1000;
    currentLevel.update();
    if(compare(currentLevel.uPPoly, currentLevel.uWinPoly) && !isPlayerClicked){
      gameState = GameState.WinAnimation;
      gameOverString = "";
      animationTimer = 100;
      currentIndex = 0;
      
      passSound.play();
      
      if(isLevelInfinity){
        timeRemaining += 3;
        if(timeRemaining > currentLevel.time) timeRemaining = currentLevel.time;
      }
    }
    if(timeRemaining <= 0){
      gameOver = true;
      gameState = GameState.End;
      animationTimer = 100;
      currentIndex = 0;
      gameOverString = "";
      failSound.play();
    }
    if(keyIsDown(RIGHT_ARROW)){
      currentLevel.getPlayerMesh().rotation += radians(isLevelInfinity ? 0.2 : 0.1) * deltaTime;
    }
    if(keyIsDown(LEFT_ARROW)){
      currentLevel.getPlayerMesh().rotation -= radians(isLevelInfinity ? 0.2 : 0.1) * deltaTime;
    }
  }
  /**
    This state handles the level cleared animation.
  */
  else if(gameState == GameState.WonAnimation){
    animationTimer -= deltaTime;
    if(currentIndex < "Level Cleared".length){
      if(animationTimer < 0){
        gameOverString += "Level Cleared"[currentIndex];
        currentIndex++;
        animationTimer = 150;
      }
    }
    resetMatrix();
    textSize(50);
    fill(0,255,0);
    noStroke();
    text(gameOverString, width/2-120, height/2);
    if(currentIndex >= "Level Cleared".length && animationTimer < 0){
      gameState = GameState.PreStart;
    }
  }
  /**
    This state handles the game over animation.
  */
  else if(gameState == GameState.End){
    if(currentIndex < "Game Over".length){
      animationTimer -= deltaTime;
      if(animationTimer < 0){
        gameOverString += "Game Over"[currentIndex];
        currentIndex++;
        animationTimer = 100;
      }
    }
    resetMatrix();
    textSize(50);
    fill(255,0,0);
    noStroke();
    text(gameOverString, width/2-120, height/2);
  }
}

/**
 Handles the setup of the level.
 This functions adds the required meshes to the render list.
 
 @param {Level} lvl - The level to setup.
*/
function setupLevel(lvl){
  renderList = [];
  renderList.push(lvl.getWinMesh());
  renderList.push(lvl.getPlayerMesh());
  lvl.getPlayerMesh().setPosition(new Vector2(100, 100));
  // pick a random location for the win mesh.
  lvl.getWinMesh().setPosition(new Vector2(random(200, 700), random(100, 300)));
}

/**
  Check to see if the player is clicked when the mouse is pressed.
*/
function mousePressed(){
  if(currentLevel.isCollidingPointWithObject(new Vector2(mouseX, mouseY))){
    isPlayerClicked = true;
  }
}

/**
  Check to see if the mouse is released.
*/
function mouseReleased(){
  isPlayerClicked = false;
}

function mouseDragged(){
  if(!isPlayerClicked) return;
  if(gameState != GameState.InGame) return;
  // Move the player to the current mouse position.
  currentLevel.playerGoto(new Vector2(mouseX, mouseY));
}

/**
  Stop playing the music if the 'M' key is pressed.
*/
function keyPressed(){
  if(keyCode == 77){
    if(gameSoundOne.isPlaying()){
      gameSoundOne.stop();
    }else{
      gameSoundOne.loop();
    }
  }
}

/**
  The actual draw call
*/
function draw() {
  render();
  update();
}