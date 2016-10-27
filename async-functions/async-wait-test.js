function wait(seconds){
	return new Promise(function(resolve){
		setTimeout(function(){
			resolve(new Date());
		}, seconds * 1000);
	});
}

console.log('log before callign wait:', new Date());

// wait(3).then(function(date){
// 	console.log('log after 3 seconds wait:', date);
// 	return wait(1);
// }).then(function(date){
// 	console.log('log 1 seconds after the 3 second wait:', date);
// 	return wait(2);
// }).then(function(date){
// 	console.log('log after ANOTHER 2 second wait:', date)
// });

(async function(){
	var foo = await wait(3);
	console.log('log after 3 seconds:', foo);
	var bar = await wait(1);
	console.log('log after 1 second:', bar);
	var baz = await wait(5);
	console.log('log after 5 seconds', baz);
}());

console.log('log after calling wait:', new Date());