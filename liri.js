
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

	case "movie-this":
	movieThis();
	break;

	case "do-what-it-says":
	doWhatitSays();
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


//Movie function

function movieThis(){
	var movie = process.argv[3];

	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";

	request(queryUrl, function(error, response, body) {

		if (!movie){
		movie = "mr.nobody";
	}

	  if (!error && response.statusCode === 200) {
	    var movieInfo = 
	    "Title: " + JSON.parse(body).Title + "\r\n" +
	    "Year: " + JSON.parse(body).Year + "\r\n" +
	    "Imdb Rating: " + JSON.parse(body).imdbRating + "\r\n" +
	    "Country: " + JSON.parse(body).Country + "\r\n" +
	    "Language: " + JSON.parse(body).Language + "\r\n" +
	    "Plot: " + JSON.parse(body).Plot + "\r\n" +
	    "Actors: " + JSON.parse(body).Actors + "\r\n" +
	    "Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating + "\r\n" +
	    "Rotten Tomatoes URL: " + JSON.parse(body).tomatoURL + "\r\n";

	    console.log(movieInfo);
	  
	  }
	})
	
	}; //end moviethis function

	//do what it says function

	function doWhatitSays(){
		fs.readFile("random.txt", "utf8", function(error,data){
			
			if (error){
				return console.log(error);
			}

				//console.log(data);

				else{

				var commandString = data.split(", ");

				console.log(commandString);

				var command = commandString[0];
				var param = commandString[1];

				switch(command) {
					case "my-tweets":
					myTweets();
					break;

					case "spotify-this-song":
					spotifySong(param);
					break;

					case "movie-this":
					movieThis(param);
					break;
				}	

			}	
		
		});
	}

		














