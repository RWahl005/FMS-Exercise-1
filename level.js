/**
  =================================================================
                              level.js
  =================================================================
  
    This file contains the code for the levels of the game.
*/

/**
  The super class of all levels.
*/
class Level{
  constructor(time, name){
    this.time = time;
    this.name = name;
  }
  
  /**
    Check to see if a point is colliding with the polygon.
    @param {Vector2} vec2 - The point to check collision with.
    
    @returns {bool} - if the point is colliding with the player object.
  */
  isCollidingPointWithObject(vec2){
    let vec = transformPoints([new Vector2(2,2), new Vector2(-2,2), new Vector2(2,-2), new Vector2(-2, -2)], vec2, this.player.rotation, new Vector2(1.3, 1.3));
    return SAT(this.uPPoly, vec);
  }
  
  /**
    Move the player to the specified positon.
    
    @param {Vector2} vec2 - The position the player should go to.
  */
  playerGoto(vec2){
    this.player.position = new Vector2(vec2.x, vec2.y);
  }
  
  /**
    Handles generic updates for the level.
  */
  update(){

    this.uPPoly = transformPoints(this.playerPoly, this.player.position, this.player.rotation, this.player.scale);
    this.uWinPoly = transformPoints(this.winPoly, this.win.position, this.win.rotation, this.win.scale);

  }
  
  getPlayerMesh(){
    return this.player;
  }
  
  getWinMesh(){
    return this.win;
  }
}

/**
 This class defines the properties of the first level.
*/
class LevelOne extends Level{
  constructor(){
    // Defines the time and name of the level.
    super(50, "Level 1");
    
    // The list of points for a square with a size of 10.
    this.playerPoly = [
      new Vector2(-5, 5),
      new Vector2(-5, -5),
      new Vector2(5, -5),
      new Vector2(5, 5)
    ];
    // The list of points for a square with a size of 10.
    this.winPoly = [
      new Vector2(-5, 5),
      new Vector2(-5, -5),
      new Vector2(5, -5),
      new Vector2(5, 5)
    ];
    
    // Picks a size for the object to be.
    let randomSize = random(4, 5);
    // Sets the player to a rectangle mesh.
    this.player = new PolygonMesh(this.playerPoly, new Vector2(0, 0));
    // Sets the player to be a random color.
    this.player.material.set(new RGBA(random(0, 255), random(0, 255), random(0,255)), 0);
    this.player.setScale(new Vector2(randomSize, randomSize));
    // Sets the winner to a rectangle mesh.
    this.win = new PolygonMesh(this.winPoly, new Vector2(0, 0));
    // Sets the scale of the win object.
    this.win.setScale(new Vector2(randomSize, randomSize));
    
    
    // These arrays hold the transformed positions.
    this.uPPoly = [];
    this.uWinPoly = [];
  }
}

/**
===============================================
                   Level 2
===============================================
*/
class LevelTwo extends Level{
  constructor(){
    // Defines the time and name of the level.
    super(50, "Level 2");
    
    // The list of points for a square with a size of 10.
    this.playerPoly = [
      new Vector2(-5, 5),
      new Vector2(-5, -5),
      new Vector2(5, -5),
      new Vector2(5, 5)
    ];
    // The list of points for a square with a size of 10.
    this.winPoly = [
      new Vector2(-5, 5),
      new Vector2(-5, -5),
      new Vector2(5, -5),
      new Vector2(5, 5)
    ];
    
    // Picks a size for the object to be.
    let randomSize = random(2, 3);
    // Sets the player to a rectangle mesh.
    this.player = new PolygonMesh(this.playerPoly, new Vector2(0, 0));
    // Sets the player to be a random color.
    this.player.material.set(new RGBA(random(0, 255), random(0, 255), random(0,255)), 0);
    this.player.setScale(new Vector2(randomSize, randomSize));
    // Sets the winner to a rectangle mesh.
    this.win = new PolygonMesh(this.winPoly, new Vector2(0, 0));
    // Sets the scale of the win object.
    this.win.setScale(new Vector2(randomSize, randomSize));
    // The list of points for a square with a size of 10.
    
    // These arrays hold the transformed positions.
    this.uPPoly = [];
    this.uWinPoly = [];
  }
}

/**
===============================================
                   Level 3
===============================================
*/
class LevelThree extends Level{
  constructor(){
    // Defines the time and name of the level.
    super(55, "Level 3");
    
    // The list of points for a square with a size of 10.
    this.playerPoly = [
      new Vector2(-5, 5),
      new Vector2(-5, -5),
      new Vector2(5, -5),
      new Vector2(5, 5)
    ];
    // The list of points for a square with a size of 10.
    this.winPoly = [
      new Vector2(-5, 5),
      new Vector2(-5, -5),
      new Vector2(5, -5),
      new Vector2(5, 5)
    ];
    
    // Picks a size for the object to be.
    let randomSize = random(4, 5);
    // Sets the player to a rectangle mesh.
    this.player = new PolygonMesh(this.playerPoly, new Vector2(0, 0));
    // Sets the player to be a random color.
    this.player.material.set(new RGBA(random(0, 255), random(0, 255), random(0,255)), 0);
    this.player.setScale(new Vector2(randomSize, randomSize));
    
    this.player.setRotation(radians(random(180, 270)));
    
    // Sets the winner to a rectangle mesh.
    this.win = new PolygonMesh(this.winPoly, new Vector2(0, 0));
    // Sets the scale of the win object.
    this.win.setScale(new Vector2(randomSize, randomSize));
    this.win.setRotation(radians(random(50, 140)));
    // The list of points for a square with a size of 10.
    
    // These arrays hold the transformed positions.
    this.uPPoly = [];
    this.uWinPoly = [];
  }
}

/**
===============================================
                   Level 4
===============================================
*/
class LevelFour extends Level{
  constructor(){
    // Defines the time and name of the level.
    super(55, "Level 4");
    
    this.playerPoly = [
      new Vector2(-5, -5),
      new Vector2(5, 5),
      new Vector2(5, -5)
    ];
    
    this.winPoly = [
      new Vector2(-5, -5),
      new Vector2(5, 5),
      new Vector2(5, -5)
    ];
    
    // Picks a size for the object to be.
    let randomSize = random(4, 5);
    // Sets the player to a rectangle mesh.
    this.player = new PolygonMesh(this.playerPoly, new Vector2(0, 0));
    // Sets the player to be a random color.
    this.player.material.set(new RGBA(random(0, 255), random(0, 255), random(0,255)), 0);
    this.player.setScale(new Vector2(randomSize, randomSize));
    
    this.player.setRotation(random(0, 270));
    
    // Sets the winner to a rectangle mesh.
    this.win = new PolygonMesh(this.winPoly, new Vector2(0, 0));
    // Sets the scale of the win object.
    this.win.setScale(new Vector2(randomSize, randomSize));
    this.win.setRotation(20);
    // The list of points for a square with a size of 10.
    
    
    // These arrays hold the transformed positions.
    this.uPPoly = [];
    this.uWinPoly = [];
  }
}

/**
===============================================
                   Level 5
===============================================
*/
class LevelFive extends Level{
  constructor(){
    // Defines the time and name of the level.
    super(20, "Level 5");
    
    this.playerPoly = [
      new Vector2(-5, -5),
      new Vector2(5, 5),
      new Vector2(5, -5)
    ];
    
    this.winPoly = [
      new Vector2(-5, -5),
      new Vector2(5, 5),
      new Vector2(5, -5)
    ];
    
    // Picks a size for the object to be.
    let randomSize = random(4, 5);
    // Sets the player to a rectangle mesh.
    this.player = new PolygonMesh(this.playerPoly, new Vector2(0, 0));
    // Sets the player to be a random color.
    this.player.material.set(new RGBA(random(0, 255), random(0, 255), random(0,255)), 0);
    this.player.setScale(new Vector2(randomSize, randomSize));
    
    this.player.setRotation(random(0, 270));
    
    // Sets the winner to a rectangle mesh.
    this.win = new PolygonMesh(this.winPoly, new Vector2(0, 0));
    // Sets the scale of the win object.
    this.win.setScale(new Vector2(randomSize, randomSize));
    this.win.setRotation(20);
    
    // These arrays hold the transformed positions.
    this.uPPoly = [];
    this.uWinPoly = [];
  }
}
/**
===============================================
                   Level 6
===============================================
*/
class LevelSix extends Level {
  constructor(){
    // Defines the time and name of the level.
    super(45, "Level 6");
    
    
    this.playerPoly = [
      new Vector2(0, 0),
      new Vector2(0, 4),
      new Vector2(5, 7),
      new Vector2(9, 3)
    ];
    this.winPoly = [
      new Vector2(0, 0),
      new Vector2(0, 4),
      new Vector2(5, 7),
      new Vector2(9, 3)
    ];
    
    
    // Picks a size for the object to be.
    let randomSize = random(4, 5);
    // Sets the player to a rectangle mesh.
    this.player = new QuadMesh(this.playerPoly, new Vector2(0, 0));
    // Sets the player to be a random color.
    this.player.material.set(new RGBA(random(0, 255), random(0, 255), random(0,255)), 0);
    this.player.setScale(new Vector2(randomSize, randomSize));
    
    //this.player.setRotation(random(0, 270));
    
    // Sets the winner to a rectangle mesh.
    this.win = new QuadMesh(this.winPoly, new Vector2(0, 0));
    // Sets the scale of the win object.
    this.win.setScale(new Vector2(randomSize, randomSize));
    //this.win.setRotation(20);

    // These arrays hold the transformed positions.
    this.uPPoly = [];
    this.uWinPoly = [];
  }
}

/**
===============================================
                   Level 7
===============================================
*/
class LevelSeven extends Level {
  constructor(){
    // Defines the time and name of the level.
    super(45, "Level 7");
    
    
    this.playerPoly = [
      new Vector2(0, 0),
      new Vector2(0, 4),
      new Vector2(5, 7),
      new Vector2(9, 3)
    ];
    this.winPoly = [
      new Vector2(0, 0),
      new Vector2(0, 4),
      new Vector2(5, 7),
      new Vector2(9, 3)
    ];
    
    
    // Picks a size for the object to be.
    let randomSize = random(4, 5);
    // Sets the player to a rectangle mesh.
    this.player = new QuadMesh(this.playerPoly, new Vector2(0, 0));
    // Sets the player to be a random color.
    this.player.material.set(new RGBA(random(0, 255), random(0, 255), random(0,255)), 0);
    this.player.setScale(new Vector2(randomSize, randomSize));
    
    this.player.setRotation(radians(random(0, 270)));
    
    // Sets the winner to a rectangle mesh.
    this.win = new QuadMesh(this.winPoly, new Vector2(0, 0));
    // Sets the scale of the win object.
    this.win.setScale(new Vector2(randomSize, randomSize));
    this.win.setRotation(radians(random(45, 45+90)));

    // These arrays hold the transformed positions.
    this.uPPoly = [];
    this.uWinPoly = [];
  }
}

/**
===============================================
                   Level 8
===============================================
*/
class LevelEight extends Level {
  constructor(){
    // Defines the time and name of the level.
    super(45, "Level 8");
    
    
    this.playerPoly = [
      new Vector2(-1, -2),
      new Vector2(1, 7),
      new Vector2(13, 5),
      new Vector2(11, -5)
    ];
    this.winPoly = [
      new Vector2(-1, -2),
      new Vector2(1, 7),
      new Vector2(13, 5),
      new Vector2(11, -5)
    ];
    
    
    // Picks a size for the object to be.
    let randomSize = random(4, 5);
    // Sets the player to a rectangle mesh.
    this.player = new QuadMesh(this.playerPoly, new Vector2(0, 0));
    // Sets the player to be a random color.
    this.player.material.set(new RGBA(random(0, 255), random(0, 255), random(0,255)), 0);
    this.player.setScale(new Vector2(randomSize, randomSize));
    
    //this.player.setRotation(random(0, 270));
    
    // Sets the winner to a rectangle mesh.
    this.win = new QuadMesh(this.winPoly, new Vector2(0, 0));
    // Sets the scale of the win object.
    this.win.setScale(new Vector2(randomSize, randomSize));
    this.win.setRotation(radians(random(50, 250)));

    // These arrays hold the transformed positions.
    this.uPPoly = [];
    this.uWinPoly = [];
  }
}

/**
===============================================
                   Level 9
===============================================
*/
class LevelNine extends Level {
  constructor(){
    // Defines the time and name of the level.
    super(45, "Level 9");
    let a = random(3, 7);
    
    
    this.playerPoly = [
      new Vector2(a, 0),
      new Vector2(a * cos(radians(60)), a * sin(radians(60))),
      new Vector2(a * cos(radians(120)), a * sin(radians(120))),
      new Vector2(-a, 0),
      new Vector2(a * cos(radians(240)), a * sin(radians(240))),
      new Vector2(a * cos(radians(300)), a * sin(radians(300))),
    ];
    this.winPoly = [
      new Vector2(a, 0),
      new Vector2(a * cos(radians(60)), a * sin(radians(60))),
      new Vector2(a * cos(radians(120)), a * sin(radians(120))),
      new Vector2(-a, 0),
      new Vector2(a * cos(radians(240)), a * sin(radians(240))),
      new Vector2(a * cos(radians(300)), a * sin(radians(300))),
    ];
    
    
    // Picks a size for the object to be.
    let randomSize = random(4, 5);
    // Sets the player to a rectangle mesh.
    this.player = new HexMesh(a, new Vector2(0, 0));
    // Sets the player to be a random color.
    this.player.material.set(new RGBA(random(0, 255), random(0, 255), random(0,255)), 0);
    this.player.setScale(new Vector2(randomSize, randomSize));
    
    //this.player.setRotation(random(0, 270));
    
    // Sets the winner to a rectangle mesh.
    this.win = new HexMesh(a, new Vector2(0, 0));
    // Sets the scale of the win object.
    this.win.setScale(new Vector2(randomSize, randomSize));
    //this.win.setRotation(20);

    // These arrays hold the transformed positions.
    this.uPPoly = [];
    this.uWinPoly = [];
  }
}

/**
===============================================
                   Level 10
===============================================
*/
class LevelTen extends Level {
  constructor(){
    // Defines the time and name of the level.
    super(30, "Level 10");
    let a = random(5, 8);
    
    
    this.playerPoly = [
      new Vector2(a, 0),
      new Vector2(a * cos(radians(60)), a * sin(radians(60))),
      new Vector2(a * cos(radians(120)), a * sin(radians(120))),
      new Vector2(-a, 0),
      new Vector2(a * cos(radians(240)), a * sin(radians(240))),
      new Vector2(a * cos(radians(300)), a * sin(radians(300))),
    ];
    this.winPoly = [
      new Vector2(a, 0),
      new Vector2(a * cos(radians(60)), a * sin(radians(60))),
      new Vector2(a * cos(radians(120)), a * sin(radians(120))),
      new Vector2(-a, 0),
      new Vector2(a * cos(radians(240)), a * sin(radians(240))),
      new Vector2(a * cos(radians(300)), a * sin(radians(300))),
    ];
    
    
    // Picks a size for the object to be.
    let randomSize = random(4, 5);
    // Sets the player to a rectangle mesh.
    this.player = new HexMesh(a, new Vector2(0, 0));
    // Sets the player to be a random color.
    this.player.material.set(new RGBA(random(0, 255), random(0, 255), random(0,255)), 0);
    this.player.setScale(new Vector2(randomSize, randomSize));
    
    //this.player.setRotation(random(0, 270));
    
    // Sets the winner to a rectangle mesh.
    this.win = new HexMesh(a, new Vector2(0, 0));
    // Sets the scale of the win object.
    this.win.setScale(new Vector2(randomSize, randomSize));
    this.win.setRotation(radians(random(40, 350)));

    // These arrays hold the transformed positions.
    this.uPPoly = [];
    this.uWinPoly = [];
  }
}

/**
===============================================
               Level Infinity
===============================================
This is an infinite level generator. It will produce an infinite amount
of randomized levels.
*/
class LevelInfinity extends Level {
  constructor(iteration){
    // Defines the time and name of the level.
    super(45, "Level Infinity +" + iteration);
    
    this.playerPoly = [];
    this.winPoly = [];
    let points;
    
    if(iteration < 5){
        points = random(3, 5);
    }
    else if(iteration < 10){
      points = random(5, 10);
    }
    else if(iteration < 15){
      points = random(10, 15);
    }
    else if(iteration < 20){
      points = random(10, 25);
    }
    else{
      points = random(15, 30);
    }
    
    for(let i = 0; i < points; i++){
      let a = random(4, 8);
      this.playerPoly.push(new Vector2(a * cos(((2*PI)/points)* i), a * sin(((2*PI)/points)* i)));
      this.winPoly.push(new Vector2(a * cos(((2*PI)/points)* i), a * sin(((2*PI)/points)* i)));
    }
    
    
    // Picks a size for the object to be.
    let randomSize = random(4, 5);
    // Sets the player to a rectangle mesh.
    this.player = new PolygonMesh(this.playerPoly, new Vector2(0, 0));
    // Sets the player to be a random color.
    this.player.material.set(new RGBA(random(0, 255), random(0, 255), random(0,255)), 0);
    this.player.setScale(new Vector2(randomSize, randomSize));
    
    //this.player.setRotation(random(0, 270));
    
    // Sets the winner to a rectangle mesh.
    this.win = new PolygonMesh(this.winPoly, new Vector2(0, 0));
    // Sets the scale of the win object.
    this.win.setScale(new Vector2(randomSize, randomSize));
    this.win.setRotation(radians(random(40, 350)));

    // These arrays hold the transformed positions.
    this.uPPoly = [];
    this.uWinPoly = [];
  }
}