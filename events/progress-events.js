const EventEmitter = require('events');

function ProgressTracker(){
  //initializes properties
  EventEmitter.call(this);
}
// SETS PROTOTYPE
//we are 'hardsetting' the prototype so that ProgressTracker() when called is an EventEmitter
//then you can use .emit() in the function
ProgressTracker.prototype = Object.create(EventEmitter.prototype);
ProgressTracker.prototype.constructor = ProgressTracker;

ProgressTracker.prototype.start = function(){
    this.emit('start');
    for(i=0; i < 100; i++){
      if(i % 10 === 0){
        this.emit('progress', i)
      }
    }
    this.emit('end')
}

  function onStartCallback(){
    console.log('starting');
  }
  function onProgressCallback(value){
    console.log('Number: ' + value)
  }
  function onEndCallback(){
    console.log('end')
  }

  var progress = new ProgressTracker();
  progress.on('start', onStartCallback);
  progress.on('progress', onProgressCallback);
  progress.on('end', onEndCallback);

  progress.start();
