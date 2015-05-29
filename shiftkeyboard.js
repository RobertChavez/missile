ThunderConnector = require('thunder-connector');

var keypress = require('keypress')
  , tty = require('tty');

// make `process.stdin` begin emitting "keypress" events

ThunderConnector.connect();

function up(degrees){
	stopTime = Math.floor(degrees * 22.3);
	setTimeout(function(){ThunderConnector.command('up');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function down(degrees){
	stopTime = Math.floor(degrees * 22.3);
	setTimeout(function(){ThunderConnector.command('down');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function turnRightDegrees(degrees){
	stopTime = Math.floor(degrees * 22.3);
	setTimeout(function(){ThunderConnector.command('right');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function turnLeftDegrees(degrees){
	stopTime = Math.floor(degrees * 22.3);
	setTimeout(function(){ThunderConnector.command('left');},0);
	setTimeout(function(){ThunderConnector.command('stop');},stopTime);
}

function fire(){
	setTimeout(function(){ThunderConnector.command('fire');},0);
}

keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', function (ch, key) {
  console.log('got "keypress"', key);

  if (key.name == 'w'){
  	console.log(key.shift);
    if (key.shift===true){
      console.log("shift key pressed");
      up(2);
    }
    else {
      up(30);
    }
    console.log("moved up");
  } else if (key.name == 's'){
  	console.log(key.shift);
  	if (key.shift===true){
      console.log("shift key pressed");
      down(2);
    } else {
      down(30);
    }
    console.log("moved down");
  } else if (key.name == 'd'){
    if (key.shift===true){
      console.log("shift key pressed");
      turnRightDegrees(2);
    } else {
      turnRightDegrees(30);
    }
  	console.log("moved right");
  } else if (key.name == 'a'){
    if (key.shift===true){
      console.log("shift key pressed");
      turnLeftDegrees(2);
    } else {
      turnLeftDegrees(30);
    }
  	console.log("moved left");
  } else if (key.name == 'space'){
  	console.log("fired");
  	fire();
  }


  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});

if (typeof process.stdin.setRawMode == 'function') {
  process.stdin.setRawMode(true);
} else {
  tty.setRawMode(true);
}
process.stdin.resume();
