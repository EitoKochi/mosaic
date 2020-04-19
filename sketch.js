let cap;
let touchX = 25;
let isTouch = false;
let isMobile;
let x_touch;
let phase;

function setup(){
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

  p5.disableFriendlyErrors = false;
  createCanvas(window.innerWidth, window.innerHeight, P2D);

  callCap(constraints);
  noStroke();
  noSmooth();
  background(0);

  frameRate(30);
}

function draw(){
  registerDegreeMosaic();
  checkOverTouchX();
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

function registerDegreeMosaic(){

  //矢印キー
  //キーを二重に押すことで変化量を倍にさせる
  if(keyIsPressed === true){
    if(keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)){
      touchX += 4;
    }else if(keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)){
      touchX -= 4;
    //キーを押すことでモザイクの度合いを変化させる
    }else if(keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW)){
      touchX += 2;
    }else if(keyIsDown(LEFT_ARROW) || keyIsDown(DOWN_ARROW)){
      touchX -= 2;
    
    //例外処理
    }else{
    }

    updateNumText();
  }
  
  
  //クリックまたはタッチ
  if(isTouch === true){
    if(isMobile === true){
      touchX = map(width-x_touch, width, 0, 0, 240+(width*0.03));
    }else{
      touchX = map(width-mouseX, width, 0, 0, 240+(width*0.01));
    }
    isTouch = false;

    checkOverTouchX();
    updateNumText();
  //例外処理
  }else{
  }

}

function touchMoved(){
  isTouch = true;
  if(isMobile === true){
    x_touch = touches[0].x;
  }else{
  }
}

function checkOverTouchX(){
  if(touchX > 240){
    touchX = 240;
  }else if(touchX < 24){
    touchX = 24
  }else{
  }
}

function updateNumText(){
  let phase = (Math.floor(map(touchX, 0, 240, 0, 100)/10))
  if(phase === 0){
    phase = 1;
  }
  
  let dNum = document.getElementById('num');
  dNum.textContent='';
  dNum.insertAdjacentHTML('afterbegin', phase);
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
  background(0);
  callCap(constraints);
}

function touchStarted(){
  return false;
}

function callCap(constraints){
  cap = createCapture(constraints);
  cap.size(window.innerWidth, window.innerHeight);
  cap.hide();
}