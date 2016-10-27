var progressCounter = function(onStart, onProgress, onEnd){
	this._onStart = onStart,
	this._onProgress = onProgress,
	this._onEnd = onEnd
}

progressCounter.prototype.start = function(){
	this._onStart();
	for (i=0; i <100; i++){
	if (i % 10 ===0){
	this._onProgress(i)
	}
	}
	this._onEnd();
}

function onStartCallback() {
	console.log('starting');
}

function onProgressCallback(value) {
	console.log('Number: ' + value)
}

function onEndCallback(){
	console.log('end')
}

var progress = new progressCounter(onStartCallback, onProgressCallback, onEndCallback);

progress.start();