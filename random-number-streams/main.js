var RandomNumber = require('./random-numbers');
var Output = require('./output');
var Filter = require('./filter');

var randomNum = new RandomNumber();
var filter = new Filter();
var output = new Output();

randomNum.pipe(filter).pipe(output);

output.on('finish', function(){
	console.log('Number output:');
	for (var key in output.store) {
		console.log(key, ':', output.store[key]);
	}
});