require('dotenv').config();
var Gen = require('sentence-generator');
var Twitter = require('twit');

const gen = Gen('./dump.txt');
var app = new Twitter({
	consumer_key: process.env.LYRMASH_KEY,
	consumer_secret: process.env.LYRMASH_SECRET,
	access_token: process.env.LYRMASH_TOKEN,
	access_token_secret: process.env.LYRMASH_TOKEN_SECRET
});

function tweeter() {
	var snippet = gen.run();
	app.post('statuses/update', {
		status: snippet
	}, function (err, data, response) {
		if (err) throw err;
		console.log("Tweeted!");
	});
}

tweeter();

setInterval(tweeter, 10*60*1000);