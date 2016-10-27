var stream = require('stream');

function Output(key, options){
	stream.Writable.call(this, options);
	this._key = key;
	this.on('finish', function() {
        Output.store[this._key] = this._value;
    });
};

Output.store = {};
Output.prototype = Object.create(stream.Writable.prototype);
Output.prototype.constructor = stream.Writable;

Output.prototype._write = function(chunk, encoding, callback){
	var num = chunk.readUInt32BE();
	console.log('Wrote ' + num);
	callback();
};

module.exports = Output;