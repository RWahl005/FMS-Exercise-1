/**
  =================================================================
                               Engine.js
  =================================================================
  
    This file contains the code for the basic functions of a render engine.
    This render engine builds off of the P5.js draw system and is object oriented.
*/

/**
  This class stores RGBA values.
*/
class RGBA{
  constructor(r = 255, b = 255, g = 255, a = 255){
    this.r = r;
    this.b = b;
    this.g = g;
    this.a = a;
  }
  
  set(r = 255, b = 255, g = 255, a = 255){
    this.r = r;
    this.b = b;
    this.g = g;
    this.a = a;
  }
}

/**
  This class handles the Material (color, stroke) of a mesh.
  The color, stroke width, and stroke color can be set.
*/
class Material{
  constructor(color = new RGBA(), strokeWidth = 1, strokeColor = new RGBA(0,0,0)){
    this.color = color;
    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor;
  }
  set (color = new RGBA(), strokeWidth = 1, strokeColor = new RGBA(0,0,0)){
    this.color = color;
    this.strokeWidth = strokeWidth;
    this.strokeColor = strokeColor;
  }
}

/**
  The super class of all the meshes.
*/
class Mesh{
  constructor(position, rotation = 0, size = new Vector2(0, 0), material = new Material()){
    this.position = position;
    this.rotation = rotation;
    this.size = size;
    this.material = material;
    this.scale = new Vector2(1, 1);
  }
  
  set(position, rotation = 0, size = new Vector2(0, 0), material = new Material()){
    this.position = position;
    this.rotation = rotation;
    this.size = size;
    this.material = material;
    this.scale = new Vector2(1, 1);
  }
  
  getPosition(){
    return this.position;
  }
  
  setPosition(position){
    this.position = position;
  }
  
  setRotation(rotation){
    this.rotation = rotation;
  }
  
  setScale(scale){
    this.scale = scale;
  }
  
  getScale(){
    return this.scale;
  }
  
  getSize(){
    return this.size;
  }
  
  rotateValue(rotate){
    this.rotation += rotate;
  }
  
  // This handles the basic rendering of a mesh including (visual) transformations.
  render(){
    resetMatrix();
    fill(this.material.color.r, this.material.color.g, this.material.color.b);
    strokeWeight(this.material.strokeWidth);
    stroke(this.material.strokeColor.r, this.material.strokeColor.g, this.material.strokeColor.b);
    // Translate, scale, rotate (The order matters).
    translate(this.position.x, this.position.y);
    scale(this.scale.x, this.scale.y);
    rotate(this.rotation);
  }

}

/**
  ============
  Meshes
  ============
  All of these meshes are deprecated (unused) except the
  polygon mesh, Quad mesh, and Hexagon mesh.

*/

/**
A rectangle mesh.
*/
class RectangleMesh extends Mesh{
  render(){
    super.render();
    rect(0, 0, this.size.x, this.size.y);
  }
}

class EllipseMesh extends Mesh{
  render(){
    super.render();
    ellipse(0, 0, this.size.x, this.size.y);
  }
}

class TriangleMesh extends Mesh{
  render(){
    super.render();
    triangle(0, this.size.y, this.size.x/2, 0, this.size.x, this.size.y);
  }
}

class QuadMesh extends Mesh{
  constructor(points, position, rotation = 0){
    super(position, rotation);
    this.points = points;
  }
  render(){
    super.render();
    quad(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y, this.points[3].x, this.points[3].y);
  }
}

class HexMesh extends Mesh{
  // Create a hexagon with a radius a.
  constructor(a, position, rotation = 0){
    super(position, rotation);
    this.a = a;
  }
  render(){
    super.render();
    let a = this.a;
    beginShape();
    vertex(a, 0);
    vertex(a * cos(radians(60)), a * sin(radians(60)));
    vertex(a * cos(radians(120)), a * sin(radians(120)));
    vertex(-a, 0);
    vertex(a * cos(radians(240)), a * sin(radians(240)));
    vertex(a * cos(radians(300)), a * sin(radians(300)));
    endShape(CLOSE);
  }
}

// Render a polygon.
class PolygonMesh extends Mesh{
  // points is an array of Vectors.
  constructor(points, position, rotation = 0){
    super(position, rotation);
    this.points = points;
  }
  
  render(){
    super.render();
    beginShape();
    for(let point of this.points){
      vertex(point.x, point.y);
    }
    endShape(CLOSE);
  }
}