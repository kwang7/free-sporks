/*
  Free Sporks: Kelly Wang and Michael Ruvinshteyn
  SoftDev1 pd07
  HW#17: Moo?
  2017-12-12  
*/

var box = document.getElementById("box");
var boxHeight = box.offsetHeight;
var boxWidth = box.offsetWidth;

//maximum distance from target to win, make smaller to increase difficulty
var winDist = 100;

//maximum change in rgb, make smaller to increase difficulty
var diff = 255;

//hardcode target as center
//randomize later
var targetX = boxWidth / 2;
var targetY = boxHeight / 2;


console.log( "box height: " + boxHeight );
console.log( "box width: " + boxWidth );

//calculate distance between current mouse pos and target
var distance = function (x0, y0, x1, y1) {
    var a = x0 - x1;
    var b = y0 - y1;
    return Math.sqrt(a*a + b*b);
};


var findIt = function(e) {
    if (distance(e.x,e.y,targetX,targetY) < winDist){
        console.log('YOU WIN!!!! :D');
    }
    else{
        console.log('Try again :c');
    }
};

//returns the maximum distance from a point that can be achieved in the box
var maxDist = function(){
    var d1 = distance(targetX,targetY,0,0);
    var d2 = distance(targetX,targetY,0,boxWidth);
    var d3 = distance(targetX,targetY,boxHeight,0);
    var d4 = distance(targetX,targetY,boxHeight,boxWidth);
    return Math.max(d1,d2,d3,d4);
}

var changeColor = function(e){
    var distMax = maxDist();
    var distMouse = distance(e.x,e.y,targetX,targetY);
    var color = 255 - Math.floor(diff * (distMouse / distMax));
    var colorIn = 'background-color:rgb(' + color + ',' + color + ',' + color + ');';
    box.setAttribute('style',colorIn);
}

console.log("maxDist: " + maxDist());

box.addEventListener("click", findIt);
box.addEventListener("mousemove",changeColor);