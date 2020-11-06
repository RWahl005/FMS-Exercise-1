/**
  This class represents an affine transformation matrix
  [1, 0, 0]
  [0, 1, 0]
  [0, 0, 1]
  or
  [m00, m01, m02]
  [m10, m11, m12]
  [m20, m21, m22]
*/
class AffineTransformation{
  constructor(){
    this.m00 = 1;
    this.m01 = 0;
    this.m02 = 0;
    //
    this.m10 = 0;
    this.m11 = 1;
    this.m12 = 0;
    //
    this.m20 = 0;
    this.m21 = 0;
    this.m22 = 1;
    //
    
  }
  
  /**
    Translate the matrix by a vector
    [1, 0, x]
    [0, 1, y]
    [0, 0, 1]
    @param {Vector2} vec - The vector to translate by.
  */
  translate(vec){
    this.m02 += vec.x * this.m00 + vec.y * this.m01;
    this.m12 += vec.x * this.m10 + vec.y * this.m11;
  }
  
  /**
    Rotate the matrix by an angle theta (denoted by t).
    [cos t, -sin t, 0]
    [sin t,  cos t, 0]
    [  0,      0,   1]
    @param {Number} angle - The angle to rotate by (in radians).
  */
  rotate(angle){
    let cosine = cos(angle);
    let sine = sin(angle);
    let temp00 = this.m00 * cosine + this.m01 * cosine;
    let temp01 = this.m00 * -sine + this.m01 * cosine;
    let temp10 = this.m10 * cosine + this.m11 * sine;
    let temp11 = this.m10 * -sine + this.m11 * cosine;
    this.m00 = temp00;
    this.m01 = temp01;
    this.m10 = temp10;
    this.m11 = temp11;
  }
  
  /**
    Scale the matrix by a vector.
    (This is just a multiplication of all values by vec.x and vec.y)
    @param {Vector2} vec - The vector to scale by.
  */
  scale(vec){
    this.m00 *= vec.x;
    this.m01 *= vec.y;
    this.m10 *= vec.x;
    this.m11 *= vec.y;
  }
  
  /**
    Transform a point using this matrix.
    
    @param {Vector2} - the point to transform
    
    @returns The transformed vector.
  */
  transform(vec){
    let x = this.m00 * vec.x + this.m01 * vec.y + this.m02;
    let y = this.m10 * vec.x + this.m11 * vec.y + this.m12;
    return new Vector2(x, y);
  }
}