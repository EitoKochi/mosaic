p5.disableFriendlyErrors = false;

let cap;
let touchX = 25;
let isTouch = false;
let isMobile;

if(navigator.userAgent.match(/iPhone|ipad|ipod|Android|Windows Phone/i )){
  isMobile = true;
}else{
  isMobile = false;
}

if(isMobile === true){
  var constraints = {
    video: {
      facingMode: {
        exact: "environment"
      },
      frameRate: {
        ideal: 20,
        max: 30
      } 
    }
  };
}else{
  var constraints = {
    video: {
      frameRate: {
        ideal: 30,
        max: 60,
      } 
    }
  };
}

function setup(){

  createCanvas(window.innerWidth, window.innerHeight, P2D);

  callCap(constraints);
  noStroke();
  noSmooth();
  background(0);

  frameRate(30);

}

function draw(){
  if(touchX > 240){
    touchX = 240;
  }else if(touchX < 25){
    touchX = 25
  }

  let interval = touchX;
  
  for(let w = 0; w < height; w += interval){
    for(let v = 0; v < width; v += interval){
      let x = map(v, 0, width, 0, width);
      let y = map(w, 0, height, 0, height);
      let col = cap.get(x, y);
      fill(col);
      
      
      rect(v, w, touchX, touchX);
    }
  }
  
  setTimeout(function(){},50);
}

function touchMoved(){
  let phase=(Math.floor(map(touchX, 25, 240, 0, 100)/10))
  if(phase === 0){
    phase = 1;
  }

  let dNum = document.getElementById('num');
  dNum.textContent='';
  dNum.insertAdjacentHTML('afterbegin', phase);

  if(isTouch === false){
    isTouch = true;
    if(isMobile === true){
      touchX = map(width-touches[0].x, width, 0, 0, 240+(width*0.03));
    }else{
      touchX = map(width-mouseX, width, 0, 0, 240+(width*0.01));
    }
    
  } else {
    isTouch = false;
  }
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
  callCap(constraints);
}

function callCap(){
  cap = createCapture(constraints);
  cap.size(window.innerWidth, window.innerHeight);
  cap.hide();
}