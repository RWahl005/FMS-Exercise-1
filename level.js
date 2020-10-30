/**
  The super class of all levels.
*/
class Level{
  constructor(time, name){
    this.time = time;
    this.name = name;
  }
  
  checkWin(){}
  
  /**
    Check to see if a point is colliding with the polygon.
    (I am going to call this code "Good Enough")
  */
  isCollidingPointWithObject(vec2){
    // This does the Separated Axis Therom against the transformed The user polygon
    // The second polygon is a small cube that represents the mouse which the
    // deltaScale of the player is subtracted from and then the cube is rotated
    // by the player's rotation.
    // let colliding =  SAT(this.uPPoly, rotatePointsAround(addToPoints([vec2.add(2,2), vec2.add(-2,2), vec2.add(2,-2), vec2.add(-2, -2)], new Vector2(-(this.player.getSize().getX() * this.player.getScale().getX())/2,
    // -(this.player.getSize().getY() * this.player.getScale().getY())/2)), vec2, this.player.rotation));
    
    console.log(rotatePointsAround(addToPoints([vec2.add(2,2), vec2.add(-2,2), vec2.add(2,-2), vec2.add(-2, -2)], new Vector2(-(this.player.getSize().getX() * this.player.getScale().getX())/2,
     -(this.player.getSize().getY() * this.player.getScale().getY())/2)), vec2, this.player.rotation));
    console.log(addToPoints([vec2.add(2,2), vec2.add(-2,2), vec2.add(2,-2), vec2.add(-2, -2)], new Vector2(-(this.player.getSize().getX() * this.player.getScale().getX())/2,
     -(this.player.getSize().getY() * this.player.getScale().getY())/2)));
    
    let colliding =  SAT(this.uPPoly, addToPoints([vec2.add(2,2), vec2.add(-2,2), vec2.add(2,-2), vec2.add(-2, -2)], new Vector2(-(this.player.getSize().getX() * this.player.getScale().getX())/2,
    -(this.player.getSize().getY() * this.player.getScale().getY())/2)));
    // colliding = comparePoint(this.uPPoly, vec2, this.player.getScale().getX() * this.player.getSize().getX());
    return colliding;
  }
  
  /**
    Move the player to the specified positon.
  */
  playerGoto(vec2){
    let rotatedScale = rotatePointAround(
      new Vector2((this.player.getSize().getX() * this.player.getScale().getX())/2,
    (this.player.getSize().getY() * this.player.getScale().getY())/2), new Vector2(0,0),     this.player.rotation);
    this.player.setPosition(
      new Vector2(
        (vec2.getX() - rotatedScale.x),
        (vec2.getY() - rotatedScale.y)
      )
    );
  }
  
    /**
    Handles generic updates for the level.
  */
  update(){
    // This loops through the player polygon positions and transforms them
    // according to the 2d transformation matrix for the mesh.
    // uPPoly holds this result.
    // This calculus might be a little scuffed.
    for(let i = 0; i < this.playerPoly.length; i++){
      let playerPolyScale = new Vector2(this.playerPoly[i].x * this.player.scale.x,
                                    this.playerPoly[i].y * this.player.scale.y);
      // Rotate and transform the object.
      this.uPPoly[i] = new Vector2(
        ((playerPolyScale.x * cos(this.player.rotation)) - (playerPolyScale.y * sin(this.player.rotation)) + this.player.getPosition().x),
        ((playerPolyScale.x * sin(this.player.rotation)) - (playerPolyScale.y * cos(this.player.rotation)) + this.player.getPosition().y)
      );
      // scale the object.
    }
    
    // Just like above, the winning polygon points are transformed according to
    // the win mesh 2d transformation matrix.
    for(let i = 0; i < this.winPoly.length; i++){
      let winPolyScale = new Vector2(this.winPoly[i].x * this.win.scale.x,
                                    this.winPoly[i].y * this.win.scale.y);
      this.uWinPoly[i] = new Vector2(
        ((winPolyScale.x * cos(this.win.rotation)) - (winPolyScale.y * sin(this.win.rotation)) + this.win.getPosition().x),
        ((winPolyScale.x * sin(this.win.rotation)) - (winPolyScale.y * cos(this.win.rotation)) + this.win.getPosition().y)
      );
    }
    // console.log(SAT(this.uPPoly, this.uWinPoly));
    // This is a debug message. This will be replaced by a you win and next level.
    // console.log(compare(this.uPPoly, this.uWinPoly));
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
    super(50, "First Level");
    // Picks a size for the object to be.
    let randomSize = random(4, 5);
    // Sets the player to a rectangle mesh.
    this.player = new RectangleMesh(new Vector2(0, 0), 
                                   0, new Vector2(10, 10));
    // Sets the player to be a random color.
    this.player.material.set(new RGBA(random(0, 255), random(0, 255), random(0,255)), 0);
    this.player.setScale(new Vector2(randomSize, randomSize));
    // Sets the winner to a rectangle mesh.
    this.win = new RectangleMesh(new Vector2(0, 0), 
                                   0, new Vector2(10, 10));
    // Sets the scale of the win object.
    this.win.setScale(new Vector2(randomSize, randomSize));
    // The list of points for a square with a size of 10.
    this.playerPoly = [
      new Vector2(0, 0),
      new Vector2(10, 0),
      new Vector2(0, 10),
      new Vector2(10, 10)
    ];
    // The list of points for a square with a size of 10.
    this.winPoly = [
      new Vector2(0, 0),
      new Vector2(10, 0),
      new Vector2(0, 10),
      new Vector2(10, 10)
    ];
    
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
    // Picks a size for the object to be.
    let randomSize = random(2, 3);
    // Sets the player to a rectangle mesh.
    this.player = new RectangleMesh(new Vector2(0, 0), 
                                   0, new Vector2(10, 10));
    // Sets the player to be a random color.
    this.player.material.set(new RGBA(random(0, 255), random(0, 255), random(0,255)), 0);
    this.player.setScale(new Vector2(randomSize, randomSize));
    // Sets the winner to a rectangle mesh.
    this.win = new RectangleMesh(new Vector2(0, 0), 
                                   0, new Vector2(10, 10));
    // Sets the scale of the win object.
    this.win.setScale(new Vector2(randomSize, randomSize));
    // The list of points for a square with a size of 10.
    this.playerPoly = [
      new Vector2(0, 0),
      new Vector2(10, 0),
      new Vector2(0, 10),
      new Vector2(10, 10)
    ];
    // The list of points for a square with a size of 10.
    this.winPoly = [
      new Vector2(0, 0),
      new Vector2(10, 0),
      new Vector2(0, 10),
      new Vector2(10, 10)
    ];
    
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
    // Picks a size for the object to be.
    let randomSize = random(4, 5);
    // Sets the player to a rectangle mesh.
    this.player = new RectangleMesh(new Vector2(0, 0), 
                                   0, new Vector2(10, 10));
    // Sets the player to be a random color.
    this.player.material.set(new RGBA(random(0, 255), random(0, 255), random(0,255)), 0);
    this.player.setScale(new Vector2(randomSize, randomSize));
    
    this.player.setRotation(random(0, 270));
    
    // Sets the winner to a rectangle mesh.
    this.win = new RectangleMesh(new Vector2(0, 0), 
                                   0, new Vector2(10, 10));
    // Sets the scale of the win object.
    this.win.setScale(new Vector2(randomSize, randomSize));
    this.win.setRotation(20);
    // The list of points for a square with a size of 10.
    this.playerPoly = [
      new Vector2(0, 0),
      new Vector2(10, 0),
      new Vector2(0, 10),
      new Vector2(10, 10)
    ];
    // The list of points for a square with a size of 10.
    this.winPoly = [
      new Vector2(0, 0),
      new Vector2(10, 0),
      new Vector2(0, 10),
      new Vector2(10, 10)
    ];
    
    // These arrays hold the transformed positions.
    this.uPPoly = [];
    this.uWinPoly = [];
  }
}