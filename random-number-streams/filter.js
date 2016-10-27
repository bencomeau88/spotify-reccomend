var stream = require('stream');

function Filter(options){
	stream.Transform.call(this, options)
		this._minNumber = 100;
};

Filter.prototype = Object.create(stream.Transform.prototype);
Filter.prototype.constructor = stream.Transform;
Filter.prototype._transform = function(chunk, encoding, callback){
	var num = chunk.readUInt32BE();
	if(num > this._minNumber){
		this.push(chunk)
	}
	else {
		console.log('the number ' + num + ' has been filtered')
	}
	callback();
};

module.exports = Filter;
