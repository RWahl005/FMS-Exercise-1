/**
  This is the basic Vector2 class.
*/
class Vector2{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
  
  getX(){
    return this.x;
  }
  
  getY(){
    return this.y;
  }
  
  setX(x){
    this.x = x;
  }
  
  setY(y){
    this.y = y;
  }
  
  add(x, y){
    return new Vector2(this.x + x, this.y + y);
  }
  
}

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
The super class of all meshes.
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
  
  render(){
    resetMatrix();
    fill(this.material.color.r, this.material.color.g, this.material.color.b);
    strokeWeight(this.material.strokeWidth);
    stroke(this.material.strokeColor.r, this.material.strokeColor.g, this.material.strokeColor.b);
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    scale(this.scale.x, this.scale.y);
  }

}

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