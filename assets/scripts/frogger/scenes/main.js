const FROG_MOVE_SPEED = 12;
const FROG_STARTING_X = 108;
const FROG_STARTING_Y = 166;
const MOVE_SPEED = 20;
const CELL_WIDTH = 12;
const CELL_HEIGHT = 12;
const COUNTDOWN_TIME = 60; // seconds

loadSound("home", "sounds/sound.mp3");

layers([
  'game',
  'sides',
  'ui',
], 'game');

// UI
// Timer
const timer = add([
  layer('ui'),
  text("Time: 60", 10),
  {
    remainingTime: COUNTDOWN_TIME // seconds
  }
]);

setInterval(() => {
  timer.remainingTime--;
  
  // Kill frog when time runs out
  if (timer.remainingTime === 0) {
    frog.respawn();
  }

  // Keep timer up-to-date
  timer.text = "Time: " + timer.remainingTime;
}, 1000);

// Lives Counter
const livesCounter = add([
  layer('ui'),
  text("Lives: 3", 10),
  pos(90, 0),
]);

const map = addLevel([
  "& * & * & * & * & ",
  "~~~~~~~~~~~~~~~~~~",
  "~~~~~~~~~~~~~~~~~~",
  "~~~~~~~~~~~~~~~~~~",
  "~~~~~~~~~~~~~~~~~~",
  "~~~~~~~~~~~~~~~~~~",
  "~~~~~~~~~~~~~~~~~~",
  "------------------",
  "==================",
  "==================",
  "==================",
  "==================",
  "==================",
  "------------------",
], {
  width: 12,
  height: 12,
  pos: vec2(10, 10),
  "=": [
    color(0,0,0),
    rect(CELL_WIDTH, CELL_HEIGHT),
    "road",
    "land"
  ],
  "-": [
    color(255,255,0),
    rect(CELL_WIDTH, CELL_HEIGHT),
    "pavement",
    "land"
  ],
  "~": [
    color(0,0,255),
    rect(CELL_WIDTH, CELL_HEIGHT),
    "water",
  ],
  "&": [
    color(0,0,255),
    rect(CELL_WIDTH*2, CELL_HEIGHT*2),
    "home",
    {
      completed: false
    }
  ],
  "*": [
    color(0,255,0),
    rect(CELL_WIDTH*2, CELL_HEIGHT*2),
    "grass",
  ],
});

const logProperties = properties => {
  const speed = properties.speed || MOVE_SPEED;

  return [
    pos(properties.spawnX, properties.spawnY),
    sprite('log'),
    'log',
    'moveable',
    {
      width: 60,
      speed,
      startingX: properties.startingX,
      startingY: properties.startingY,
      onMap() {
        return (this.pos.x + this.width >= map.getPos().x && this.pos.x < map.getPos().x + map.width())
      }
    }
  ]
}

const carProperties = properties => {
  const speed = properties.speed || MOVE_SPEED;

  return [
    pos(properties.spawnX, properties.spawnY),
    sprite('car'),
    'car',
    'moveable',
    {
      width: 12,
      speed,
      startingX: properties.startingX,
      startingY: properties.startingY,
      onMap() {
        return (this.pos.x + this.width >= map.getPos().x && this.pos.x < map.getPos().x + map.width())
      }
    }
  ]
}

// Obstacles

// cars
// bottom cars
add(carProperties({spawnX: 10, spawnY: 154, startingX: 10, startingY: 154}));
add(carProperties({spawnX: 40, spawnY: 154, startingX: 10, startingY: 154}));
add(carProperties({spawnX: 100, spawnY: 154, startingX: 10, startingY: 154}));
add(carProperties({spawnX: 150, spawnY: 154, startingX: 10, startingY: 154}));


// 2nd bottom cars
add(carProperties({spawnX: 10, spawnY: 142, startingX: 226, startingY: 142, speed: -MOVE_SPEED * 0.75 }));
add(carProperties({spawnX: 82, spawnY: 142, startingX: 226, startingY: 142, speed: -MOVE_SPEED * 0.75 }));
add(carProperties({spawnX: 164, spawnY: 142, startingX: 226, startingY: 142, speed: -MOVE_SPEED * 0.75 }));


// 3rd bottom cars
add(carProperties({spawnX: 10, spawnY: 130, startingX: 10, startingY: 130, speed: MOVE_SPEED * 2.75 }));
add(carProperties({spawnX: 122, spawnY: 130, startingX: 10, startingY: 130, speed: MOVE_SPEED * 2.75 }));

// 2nd top cars
add(carProperties({spawnX: 10, spawnY: 118, startingX: 226, startingY: 118, speed: -MOVE_SPEED * 1.25 }));
add(carProperties({spawnX: 122, spawnY: 118, startingX: 226, startingY: 118, speed: -MOVE_SPEED * 1.25 }));

// top cars
add(carProperties({spawnX: 10, spawnY: 106, startingX: 10, startingY: 106 }));
add(carProperties({spawnX: 80, spawnY: 106, startingX: 10, startingY: 106 }));
add(carProperties({spawnX: 160, spawnY: 106, startingX: 10, startingY: 106 }));


// logs
// bottom log
add(logProperties({spawnX: -50, spawnY: 82, startingX: -50, startingY: 82}));
add(logProperties({spawnX: 30, spawnY: 82, startingX: -50, startingY: 82}));
add(logProperties({spawnX: 110, spawnY: 82, startingX: -50, startingY: 82}));


// 2nd from bottom log
add(logProperties({spawnX: 226, spawnY: 70, speed: -MOVE_SPEED * 0.5, startingX: 226, spawnY: 70 }));
add(logProperties({spawnX: 100, spawnY: 70, speed: -MOVE_SPEED * 0.5, startingX: 226, startingY: 70}));


// 3rd from bottom log
add(logProperties({spawnX: -50, spawnY: 58, startingX: -50, spawnY: 58, speed: MOVE_SPEED * 2.25 }));
add(logProperties({spawnX: 90, spawnY: 58, startingX: -50, spawnY: 58, speed: MOVE_SPEED * 2.25 }));


// 3rd from top log
add(logProperties({ spawnX: 226, spawnY: 46, startingX: 226, spawnY: 46, speed: -MOVE_SPEED }));


// 2nd top log
add(logProperties({ spawnX: -50, spawnY: 34, startingX: -50, spawnY: 34, speed: MOVE_SPEED * 0.75 }));
add(logProperties({ spawnX: 150, spawnY: 34, startingX: -50, spawnY: 34, speed: MOVE_SPEED * 0.75 }));


// top log
add(logProperties({ spawnX: 226, spawnY: 22, startingX: 226, spawnY: 22, speed: -MOVE_SPEED * 1.5 }));
add(logProperties({ spawnX: 100, spawnY: 22, startingX: 226, spawnY: 22, speed: -MOVE_SPEED * 1.5}));


// frog controls
keyPress("right", () => {
  frog.changeSprite("frogger-right");
  if (frog.pos.x + FROG_MOVE_SPEED >= map.getPos().x + map.width()) {
    return;
  }

	frog.pos.x += FROG_MOVE_SPEED;
});

keyPress("left", () => {
  frog.changeSprite("frogger-left");
  if (frog.pos.x - FROG_MOVE_SPEED < map.getPos().x) {
    return;
  }

	frog.pos.x -= FROG_MOVE_SPEED;
});

keyPress("down", () => {
  frog.changeSprite("frogger-down");
  if (frog.pos.y + FROG_MOVE_SPEED >= map.getPos().y + map.height()) {
    return;
  }

	frog.pos.y += FROG_MOVE_SPEED;
});

keyPress("up", () => {
  frog.changeSprite("frogger-up");
  if (frog.pos.y - FROG_MOVE_SPEED < map.getPos().y) {
    return;
  }

	frog.pos.y -= FROG_MOVE_SPEED;
});

// game runtime
action(() => {
  every('moveable', obj => {
    obj.move(obj.speed, 0);

    if (obj.onMap())
      return;

    obj.pos.x = obj.startingX;
  });

  // frog on log
  if (frog.floatSpeed) {
    frog.move(frog.floatSpeed, 0);

    // kill the frog when it gets swept off the map
    if (!frog.onMap()) {
      frog.respawn();
    }
  }
});


// Frog
let frog = add([
  pos(FROG_STARTING_X, FROG_STARTING_Y),
  sprite('frogger-up'),
  'frog',
  {
    respawn (reduceLife=true) {
      if (reduceLife)
        this.lives--;

      if (this.lives === 0)
        go('game-over', { message: 'You Lose!'});

      livesCounter.text = 'Lives: ' + this.lives;

      timer.remainingTime = COUNTDOWN_TIME;
      timer.text = 'Time: ' + COUNTDOWN_TIME;

      this.pos.x = FROG_STARTING_X;
      this.pos.y = FROG_STARTING_Y;
    },
    onMap() {
      return (this.pos.x + this.width >= map.getPos().x && this.pos.x < map.getPos().x + map.width());
    },
    lives: 3,
  }
]);

// Kill frog if it gets run over
frog.overlaps('car', () => frog.respawn());

frog.overlaps('log', log => frog.floatSpeed = log.speed);

frog.overlaps('land', () => frog.floatSpeed = null);

frog.overlaps('water', () => {
  frog.isFloating = false;

  every('log', log => {
    if (frog.pos.y == log.pos.y && frog.pos.x >= log.pos.x && frog.pos.x < log.pos.x + log.width)
      frog.isFloating = true;
  });

  if (!frog.isFloating)
    frog.respawn();
});

frog.overlaps('home', home => {
  // frog still hasn't quite made it over the endzone
  if (frog.pos.y !== home.pos.y)
    return;

  frog.respawn(false);

  // If frog jumps into a home zone that has already been completed then just respawn frog.
  if (home.completed)
    return;

  home.completed = true;
  home.color = color(255, 255, 255);

  // Victory scream!
  play('home');

  // if all homes are completed the player has won!
  let completedCount = 0;
  every('home', home => {
    if (home.completed)
      completedCount++;
  });

  if (completedCount === 5)
    go('game-over', { message: 'You Win!' });
});


// Add top layer 'curtains' that hide objects as the leave the left and right sides of the map. This is a bit of a hack.
add([rect(10, 500), layer('sides'), color(0, 0, 0)]);
add([rect(60, 500), pos(226, 0), layer('sides'), color(0, 0, 0)]);
