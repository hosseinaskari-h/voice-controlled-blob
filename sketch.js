// Voice controlled shape, made by hossein Askari. allow mic and move the shape by saying UP LEFT DOWN RIGHT



var myRec = new p5.SpeechRec('en-US', parseResult);
myRec.continuous = true;
myRec.interimResults = true;

var curPos;
var velocity;
var acceleration;

function setup() {
  createCanvas(800, 600);
  background(255, 255, 255);
  fill(0, 0, 0, 155);

  curPos = createVector(width / 2, height / 2);
  velocity = createVector(0, 0);
  acceleration = createVector(0, 0);
  
  textSize(20);
  textAlign(LEFT);
  text("draw: up, down, left, right, clear", 20, 20);

  myRec.start();
}

function draw() {
  //to get the moving effect but not leaving traces
  fill(255, 255, 255, 25);
  noStroke();
  rect(0, 0, width, height);
//to get the fluid effect we first get the accleration from the speech rec code, add that to current velocity and use it as the x and y
  velocity.add(acceleration);
  curPos.add(velocity);
// to stay in bounds
  curPos.x = constrain(curPos.x, 0, width);
  curPos.y = constrain(curPos.y, 0, height);
  
  noisyShape(curPos.x, curPos.y, 40, 50, 0.5); 
  // to not have infinte accleration
  acceleration.mult(0);
}
function parseResult() {
  var mostrecentword = myRec.resultString.split(' ').pop();

  if (mostrecentword.indexOf("left") !== -1) { acceleration.x = -0.1; }
  else if (mostrecentword.indexOf("right") !== -1) { acceleration.x = 0.1; }
  else if (mostrecentword.indexOf("up") !== -1) { acceleration.y = -0.1; }
  else if (mostrecentword.indexOf("down") !== -1) { acceleration.y = 0.1; }
  else if (mostrecentword.indexOf("clear") !== -1) { background(255); }
//fps killer
  //console.log(mostrecentword);
}

function noisyShape(ox, oy, vertNum, radius, noiseAmplitude) {
  let angleStep = 360.0 / vertNum;

  push();
  translate(ox, oy);
  stroke(0); 
  noFill();
  beginShape();
  for (let vn = 0; vn < vertNum; vn++) {
    let vX = cos(radians(angleStep * vn)) * radius;
    let vY = sin(radians(angleStep * vn)) * radius;
    
    let noiseValue = noise(frameCount * 0.01 + vn);
    
    vX += noiseValue * (vX * noiseAmplitude);
    vY += noiseValue * (vY * noiseAmplitude);
    
    vertex(vX, vY);
  }
  endShape(CLOSE);
  pop();
}
