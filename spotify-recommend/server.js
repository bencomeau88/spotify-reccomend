var unirest = require('unirest');
var express = require('express');
var events = require('events');
var app = express();
app.use(express.static('public'));

var getFromApi = function(endpoint, args) {
    var emitter = new events.EventEmitter();
    unirest.get('https://api.spotify.com/v1/' + endpoint)
           .qs(args)
           //same as .then() but .end() always runs and .then() runs when it works only
           .end(function(response) {
                if (response.ok) {
                    emitter.emit('end', response.body);
                }
                else {
                    emitter.emit('error', response.code);
                }
            });
    return emitter;
};



app.get('/search/:name', function(req, res) {
    var searchReq = getFromApi('search', {
        q: req.params.name,
        limit: 1,
        type: 'artist'
    });

    searchReq.on('end', function(item) {
        console.log(item.artists.items[0]);
        var artist = item.artists.items[0];
// get artist ID store as VAR
        var id = artist.id;
// use id and getFromApi() to search related-artists endpoint
        var relatedReq = getFromApi('artists/'+id+'/related-artists');
        // on successful end append an array of similar artists
        relatedReq.on('end', function(artistArray){
          artist.related = artistArray.artists;
          res.json(artist);
        });
    });
    // generic error code A FEW PROBLEMS HERE
var error = function(){
  res.sendStatus(404);
};
  //calls generic error code when there is an error
    searchReq.on('error', error)
});

app.listen(process.env.PORT || 8080);
