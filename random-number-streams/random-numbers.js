var stream = require('stream');
// RandomNumber() minimum number is high because we only 
// are going to filter numbers <100
function RandomNumber(options){
	stream.Readable.call(this, options);
	this._min = 50;
	this._max = 300;
	// logs how many numbers >100 we have
	this._count = 0;
	// only want to count 50
	this._maxCount = 50;
};
RandomNumber.prototype = Object.create(stream.Readable.prototype);
RandomNumber.prototype.constructor = RandomNumber;
RandomNumber.prototype.getRandomNum = function(){
	var number = Math.random() * this._max;
	var roundNum = Math.round(number);
	return roundNum;
}

RandomNumber.prototype._read = function() {
	var value = this.getRandomNum();
	var buf = new Buffer(4);
	buf.writeUInt32BE(value);
	this.push(buf);
	this._count++;
	if (this._count === this._maxCount){
		this.push(null);
	}
};

module.exports = RandomNumber;