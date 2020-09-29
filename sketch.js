//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dogImg;
function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");

  
}

function setup() {
  database = firebase.database();
	createCanvas(500,500);
dog = createSprite(250,300,20,20);
dog.addImage(dogImg);
dog.scale = 0.2;

foodStock=database.ref('Food');
foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,37);
  textSize(20);
  fill("white")
  text ("Note: Press UP_ARROW Key To Feed Drago Milk!!!",50,50);
  text("Food Remaining:"+foodS,150,200);
  drawSprites();
  //add styles here
  //dog.display();
  //dogImg1.display();
  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

}


function readStock(data){
foodS=data.val();
}

function writeStock(x){
  if( x <= 0){
    x = 0;
  }else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
  }