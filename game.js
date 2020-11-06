/*
  Goal for Milestone 2 were defined and we agreed on the following:
  Have 1 shape in screen and be able to drag it some else in the screen.
  Team 1 and Dr. Helen Chavez.
  
  
  The console will print out true if the two objects overlap enough to win/go to the next level.
  
  Jacob Bell, Ryan Wahl, Jacqueline Salamanca, Charmi Patel.
*/


/**
  This psuedo enum defines the possible game states.
*/
const GameState = {
  PreStart: 0,
  PreAnimation: 1,
  InGame: 2,
  WonAnimatin: 3,
  End: 4
}
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

let isLevelInfinity = false;
let infiniteIterationCount = 0;

/**
  Setup the canvas.
*/
function setup() {
  createCanvas(800, 450);
   let mesh = new RectangleMesh(new Vector2(width/2, height/2), 0, new Vector2(20, 20));
  mesh.setScale(new Vector2(4, 4));
  mesh.material.set(new RGBA(255, 0, 0), 1, new RGBA(0, 255, 0))
  renderList.push(mesh);
  
  // Add the first level to the level list.
  // levelList.push(new LevelInfinity(0));
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
  
}


/**
  Handles the rendering of the system.
*/
function render(){
  background(220);
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
  if(gameState == GameState.PreStart){
    currentLevel = levelList.pop();
    if(currentLevel == null)
      currentLevel = new LevelInfinity(infiniteIterationCount++);
    renderList = [];
    gameState = GameState.PreAnimation;
    gameOverString = "";
    animationTimer = 100;
    currentIndex = 0;
  }
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
      timeRemaining = currentLevel.time;
      gameState = GameState.InGame;
      // currentLevel.getPlayerMesh().setRotation(1);
      // currentLevel.getWinMesh().setRotation(1);
    }
  }
  else if(gameState == GameState.InGame){
    timeRemaining -= deltaTime/1000;
    currentLevel.update();
    if(compare(currentLevel.uPPoly, currentLevel.uWinPoly) && !isPlayerClicked){
      gameState = GameState.WinAnimation;
      gameOverString = "";
      animationTimer = 100;
      currentIndex = 0;
    }
    if(timeRemaining <= 0){
      gameOver = true;
      gameState = GameState.End;
      animationTimer = 100;
      currentIndex = 0;
      gameOverString = "";
    }
    if(keyIsDown(RIGHT_ARROW)){
      currentLevel.getPlayerMesh().rotation += radians(1);
    }
    if(keyIsDown(LEFT_ARROW)){
      currentLevel.getPlayerMesh().rotation -= radians(1);
    }
  }
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

function mousePressed(){
  // TODO:: This does not take into account a rotation transformation, fix that.
  if(currentLevel.isCollidingPointWithObject(new Vector2(mouseX, mouseY))){
    isPlayerClicked = true;
  }
}

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
  The actual draw call
*/
function draw() {
  render();
  update();
}