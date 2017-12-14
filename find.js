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
var diff = 100;

//counts the number of failures the user has encountered
var failures = 0;

//counts the number of failures the user has encountered this round (in between successes)
var currFailures = 0;

//counts the number of successes the user has achieved
var successes = 0;

//h and s aspects of the hsl background-color
var hue = 0;
var sat = 50;

//hardcode target as center
//randomize later
var targetX = boxWidth / 2;
var targetY = boxHeight / 2;


console.log( "box height: " + boxHeight );
console.log( "box width: " + boxWidth );

//calculate distance between two points given their coordinates
var distance = function (x0, y0, x1, y1) {
    var a = x0 - x1;
    var b = y0 - y1;
    return Math.sqrt(a*a + b*b);
};

var insults = ["You almost got it, but not really...",
	       "Hey look, it's NOT the target!",
	       "Take your time, I won't judge...publically...",
	       "Wow, you actually didn't see it...",
	       "There,there. Success isn't for everyone."
	       ]

var chooseComment = function(){
    return insults[Math.floor(Math.random() * insults.length)];
}

//checks to see if the user clicks within the target's range, and notifies accordingly
var findIt = function(e) {
    if (distance(e.x,e.y,targetX,targetY) < winDist){
	successes += 1;
	currFailures = 0;
	document.getElementById('successCounter').innerHTML = "Non-Failures: " + successes;
	document.getElementById('currFailCounter').innerHTML = "Failures this round: 0";
        console.log('YOU GOT IT!');
	alert("YOU ACTUALLY FOUND IT!!! :D");
        randomizeTarget();
    }
    else{
	failures += 1;
	currFailures += 1;
	document.getElementById('failCounter').innerHTML = "Failures: " + failures;
	document.getElementById('currFailCounter').innerHTML = "Failures this round: " + currFailures;
	alert(chooseComment());
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

//changes color of background based on the distance of the mouse from the target
var changeColor = function(e){
    var distMax = maxDist();
    var distMouse = distance(e.x,e.y,targetX,targetY);
    var color = 100 - Math.floor(diff * (distMouse / distMax));
    var colorIn = 'background-color:hsl(' + hue + ', ' + sat + '%,' + color + '%'+ ');';
    box.setAttribute('style',colorIn);
}

//randomizes the position of the target
var randomizeTarget = function(){
    targetX = Math.floor(Math.random() * boxWidth);
    targetY = Math.floor(Math.random() * boxHeight);
}

console.log("maxDist: " + maxDist());

var success = document.createElement('h1');
success.setAttribute('style','float: left; padding-left: 10px;');
success.setAttribute('id','successCounter');
success.innerHTML = 'Non-Failures: ' + successes;
document.getElementById('box').appendChild(success);

var fail = document.createElement('h1');
fail.setAttribute('style','float: right; padding-right: 10px;');
fail.setAttribute('id','failCounter');
fail.innerHTML = 'Failures: ' + failures;
document.getElementById('box').appendChild(fail);

document.getElementById('box').appendChild(document.createElement('br'));
document.getElementById('box').appendChild(document.createElement('br'));
document.getElementById('box').appendChild(document.createElement('br'));
document.getElementById('box').appendChild(document.createElement('br'));

var currFail = document.createElement('p');
currFail.setAttribute('style','text-align: right; padding-right: 10px;');
currFail.setAttribute('id','currFailCounter');
currFail.innerHTML = 'Failures this round: ' + currFailures;
document.getElementById('box').appendChild(currFail);

alert("Find the target on this page. The lighter the background, the closer you are to it. Click when you think you've found it.");
randomizeTarget();
box.addEventListener("click", findIt);
box.addEventListener("mousemove",changeColor);
