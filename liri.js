
//input
var action = process.argv[2];

//request
var fs = require("fs");
var request = require("request");



//create keys variable that will retrieve data from keys.js

var keys = require("./keys.js");
var twitter = require("twitter");

var spotify = require("spotify");



//switch cases

switch (action) {
	case "my-tweets":
	myTweets();
	break;

	case "spotify-this-song":
	spotifySong();
	break;
}


//twitter function

function myTweets(){
	var client = new twitter({
		consumer_key: keys.twitterKeys.consumer_key,
			consumer_secret: keys.twitterKeys.consumer_secret,
			access_token_key: keys.twitterKeys.access_token_key,
			access_token_secret: keys.twitterKeys.access_token_secret, 
		});

	var username = process.argv[3];

	if (!username){
		username = "alia_s_94";
	}

	params = {screen_name: username};
	client.get("statuses/user_timeline/", params, function(error, tweets, response){

		if (!error) {

			for(var i = 0; i < tweets.length; i++) {

				var twitterResults = i + ") " + tweets[i].user.screen_name + ": " +
				tweets[i].text + "\r\n" + tweets[i].created_at + "\r\n";
				console.log(twitterResults);
 			}
		}

	});
} //end of twitter function

//beginning of spotify function

function spotifySong(){
	var songName = process.argv[3];
	if (!songName){
		songName = "the sign";
	}

	params = songName;
	spotify.search({type: "track", query: params }, function(err, data){
		if (!err){
			var songInfo = data.tracks.items;
			for (var i = 0; i < 5; i++){
				if (songInfo[i] !=undefined){
					var spotifyResults = 
					"Artist: " + songInfo[i].artists[0].name + "\r\n" +
					"Song: " + songInfo[i].name + "\r\n" +
					"Preview link: " + songInfo[i].preview_url + "\r\n" +
					"Album: " + songInfo[i].album.name;

					console.log(spotifyResults);
				}
			}
		}
	});
};

//end of spotify function that isn't working

















