var pos = 0;
const pacArray = [
  ['./PacMan1.png', './PacMan2.png'],
  ['./PacMan3.png', './PacMan4.png'],
];
let Xdirection = 0;
let Ydirection = 0;
const pacMen = []; // This array holds all the pacmen

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(9); // {x:?, y:?}
  let position = setToRandom(199);

  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './PacMan1.png';
  newimg.width = 99;
  newimg.height = 99;

  // TODO: set position here
  newimg.style.left = position.x + 'px';
  newimg.style.top = position.y + 'px';

  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    Xdirection,
    Ydirection,
    newimg,
  };
}

function update() {
  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    
    //moves the pacmen in the correct X direction
    if(item.Xdirection == 0) {
      item.position.x = item.position.x + item.velocity.x;
      item.newimg.style.left = item.position.x;
    }else if(item.Xdirection == 1){
      item.position.x = item.position.x - item.velocity.x;
      item.newimg.style.left = item.position.x;
    } else console.log('XDirection error');

    //moves the pacmen in the correct Y direction
    if(item.Ydirection == 0) {
      item.position.y = item.position.y + item.velocity.y;
      item.newimg.style.top = item.position.y;
    }else if(item.Ydirection == 1){
      item.position.y = item.position.y - item.velocity.y;
      item.newimg.style.top = item.position.y;
    } else console.log('YDirection error');

  });
  setTimeout(update, 20);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  //getting values of max width and height
  let pageBoundX = window.innerWidth;
  let pageBoundY = window.innerHeight;

  // reversing direction of X if hit boundary
  if((item.position.x + item.newimg.width) >= pageBoundX) {
    item.Xdirection = 1;
  } else if(item.position.x <= 0) {
    item.Xdirection = 0;
  }

  // reversing direction of Y if hit boundary
  if((item.position.y + item.newimg.height) >= pageBoundY ) {
    item.Ydirection = 1;
  } else if(item.position.y <= 0) {
    item.Ydirection = 0;
  }

}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

//don't change this line
module.exports = {checkCollisions, update, pacMen};
