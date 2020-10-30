/**
  This is an implementation of the Separated Axis Therom, which is a collision algorithm for
  polygons.
  
  This is currently unused but may be used in the future.
  
  Note: this algorithm only works for convex polygons, not concave.
  
  @param {Array} poly1 - An array containing a list of vectors that make up the poloygon.
  @param {Array} poly2 - An array containing a list of vectors that make up the second polygon.
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
  
  @param {Array} poly1 - An array of vectors that define the polygon.
  @param {Array} poly2 - An array of vectors that define the second polygon.
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
    
    if(leastDist > 20)
      return false;
  }
  return true;
}

function comparePoint(poly1, point, scale){
  // This goes through all of the polygon points and computes the distance.
  // If the min distance is greater than 20, then the shapes do not overlap at all or enough.
  for(let i = 0; i < poly1.length; i++){
    let leastDist = Infinity;
      let dist = sqrt((poly1[i].x-point.x)**2 + (poly1[i].y-point.y)**2);
    console.log(dist);
    console.log(scale);
    
    if(dist > scale+20)
      return false;
  }
  return true;
}

/**
  Rotate a point around a center.
  
  @param {Vector2} point - The point to rotate
  @param {Vector2} center - The center to rotate around
  @param {Number} angle - The angle to rotate by (in radians).
*/
function rotatePointAround(point, center, angle){
  angle *= -1;
  return new Vector2(
  cos(angle) * (point.getX() - center.getX()) - sin(angle) * (point.getY() - center.getY()) + center.getX(),
    sin(angle) * (point.getX() - center.getX()) - cos(angle) * (point.getY() - center.getY()) + center.getY()
  );
}

function rotatePointsAround(pointArray, center, angle){
  let output = [];
  for(let point of pointArray){
    output.push(rotatePointAround(point, center, angle));
  }
  return output;
}

function addToPoints(pointArray, vec){
  let output = [];
  for(let point of pointArray){
    output.push(point.add(vec.x, vec.y));
  }
  return output;
}