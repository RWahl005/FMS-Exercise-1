/**
  =================================================================
                          helper_functions.js
  =================================================================
  
    This file contains the code for functions that assist with the game. This includes
    collision functions.
*/

/**
  This is an implementation of the Separated Axis Therom, which is a collision algorithm for
  polygons.
  
  @param {Vector2[]} poly1 - An array containing a list of vectors that make up the poloygon.
  @param {Vector2[]} poly2 - An array containing a list of vectors that make up the second polygon.
  @returns If the two polygons collide.
*/
function SAT(poly1, poly2){
  let tempPoly1 = poly1;
  let tempPoly2 = poly2;
  for(let shape = 0; shape<2; shape++){
    if(shape == 1){
      tempPoly1 = poly2;
      tempPoly2 = poly1;
    }
    for(let i = 0; i < tempPoly1.length; i++){
      let b = (i + 1) % tempPoly1.length;
      let axisProjection = new Vector2(-(tempPoly1[b].getY() - tempPoly1[i].getY()), tempPoly1[b].getX() - tempPoly1[i].getX());
      let d = sqrt(axisProjection.getX()**2 + axisProjection.getY()**2);
      
      let min_r1 = Infinity, max_r1 = -Infinity;
      for(let p = 0; p < tempPoly1.length; p++){
        let q = (tempPoly1[p].getX() * axisProjection.getX() + tempPoly1[p].getY() * axisProjection.getY());
        min_r1 = min(min_r1, q);
        max_r1 = max(max_r1, q);
      }
      
      let min_r2 = Infinity, max_r2 = -Infinity;
      for(let p = 0; p < tempPoly2.length; p++){
        let q = (tempPoly2[p].getX() * axisProjection.getX() + tempPoly2[p].getY() * axisProjection.getY());
        min_r2 = min(min_r2, q);
        max_r2 = max(max_r2, q);
      }
      
      if(!(max_r2 >= min_r1 && max_r2 >= min_r2))
        return false;
    }
    
  }
  return true;
}

/**
  Compare Poly1 to Poly2 by checking to see if the majority of the shape overlaps.
  
  @param {Vector2[]} poly1 - An array of vectors that define the polygon.
  @param {Vector2[]} poly2 - An array of vectors that define the second polygon.
*/
function compare(poly1, poly2){
  // This goes through all of the polygon points and computes the distance.
  // If the min distance is greater than 20, then the shapes do not overlap at all or enough.
  for(let i = 0; i < poly1.length; i++){
    let leastDist = Infinity;
    for(let x = 0; x < poly2.length; x++){
      let dist = sqrt((poly1[i].x - poly2[x].x)**2 + (poly1[i].y-poly2[x].y)**2);
      if(dist < leastDist)
        leastDist = dist;
    }
    
    if(leastDist > 10)
      return false;
  }
  return true;
}

/**
  Transform points according to the inputed translation, rotation, and scale.
  
  The order of transformation is: Translate, Rotate, Scale
  
  @param {Vector2[]} points - The array of Vector2 points that needs to be transformed.
  @param {Vector2} translation - The translation of the points.
  @param {Number} rotation - The rotation of the points.
  @param {Vector2} scale - The scale of the rotation.
*/
function transformPoints(points, translation, rotation, scale){
  let transformer = new AffineTransformation();
  transformer.translate(translation);
  transformer.scale(scale);
  transformer.rotate(rotation);
  let output = [];
  for(let point of points){
    output.push(transformer.transform(point));
  }
  return output;
}