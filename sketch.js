var trex 
var trex_running;
var ground,ground_image;
var cloud,cloudimage;
var obstacle1image,obstacle;
var obstacle2image;
var obstacle3image;
var obstacle4image;        
var obstacle5image;
var obstacle6image;
var obgroup, cloudgroup;
var inground ;
var collideimage,trexcollide;
var restart,restartimage;
var gameover,overimage;
var score = 50;
var gamestate = "play"
var jumpsound,cpsound,diesound;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
ground_image =
  loadImage("ground2.png")
  cloudimage=
    loadImage("cloud.png")
 obstacle1image = loadImage("obstacle1.png")
obstacle2image = loadImage("obstacle2.png")
  obstacle3image = loadImage("obstacle3.png")
  obstacle4image = loadImage("obstacle4.png")
  obstacle5image = loadImage("obstacle5.png")
  obstacle6image = loadImage("obstacle6.png")
  trexcollide = loadImage("trex_collided.png")
  overimage = loadImage("gameOver.png")
  restartimage = loadImage("restart.png")
  jumpsound = loadSound("jump.mp3")
  cpsound = loadSound("checkPoint.mp3")
  diesound = loadSound("die.mp3")
  
}

function setup(){
  createCanvas(600,200)
  trex = createSprite(40,180,10,10)
  trex.addAnimation("1",trex_running);
  trex.addAnimation("2",trexcollide)
  trex.scale = 0.5; 
  ground = createSprite(300,190,600,5)
  ground.addImage("yashika",ground_image)
  obgroup = createGroup()
  cloudgroup = createGroup()
  inground = createSprite(300,198,600,5)
  inground.visible = false;
  trex.setCollider("circle",0,0,40);
  trex.debug = false;
  restart = createSprite(300,140,10,10)
  restart.scale = 0.5
  restart.addImage ("yashika",restartimage)
  gameover = createSprite(300,100,10,10)
  gameover.addImage("yashika",overimage)
  
}

function draw(){
  background("white")
  
  textSize (25)
  text("score:"+score,480,30)

   
  if (gamestate=="play"){
    trex.changeAnimation("1",trex_running)
      ground.velocityX = -(3*score/100)
    populatecloud()
    populateobstacle()
    
    score = score + 1
    
    restart.visible = false;
    gameover.visible = false;
    
    if(keyDown("space")&& trex.y >100)
  {
    trex.velocityY = -12 
    jumpsound.play()
  }
   trex.velocityY = trex.velocityY + 2 
  
  if(ground.x < 0 ){
    ground.x = 300;           
  }
  if (trex.isTouching(obgroup)){
    diesound.play()
    gamestate = "end"
  }
    if(score%500==0){
      cpsound.play()
      
    }
  }
  
  if (gamestate=="end"){
    trex.changeAnimation("2",trexcollide)
    trex.velocityY = trex.velocityY + 2
    ground.velocityX = 0;
    obgroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obgroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);
    
    gameover.visible = true;
    restart.visible = true;
    
    if (mousePressedOver(restart)){
      
      reset();
    }
    
  }  
  
  trex.collide(inground) 
  
  
  console.log(frameCount)
  
  drawSprites();
  
  
  

}
function populatecloud()

{
  if(frameCount%60==0){
  cloud = createSprite(550,50,10,10)
  cloud.addImage("yashika",cloudimage)
  cloud.velocityX = -5
  cloud.y = Math.round(random(50,100))
    cloud.lifetime = 120
    cloudgroup.add (cloud)
  
}}
function populateobstacle()
{
  if(frameCount%60==0){
  obstacle = createSprite(580,180,10,10)
    obstacle.scale = 0.5
  obstacle.velocityX = -(3*(score/100))
  obstacle.lifetime = 120
  var a =Math.round(random(1,6))
  switch(a) 
{
  case 1:obstacle.addImage("yashika",obstacle1image)
  break 
  case 2:obstacle.addImage("yashika",obstacle2image)
  break
  case 3:obstacle.addImage("yashika",obstacle3image)
  break
  case 4:obstacle.addImage("yashika",obstacle4image)
  break
  case 5:obstacle.addImage("yashika",obstacle5image)
  break
  case 6:obstacle.addImage("yashika",obstacle6image)
  break
  
    }
 obgroup.add(obstacle)
    
}}
  
 function reset() {
   
   gamestate = "play"
   score = 0
   cloudgroup.destroyEach();
   obgroup.destroyEach();
 }










