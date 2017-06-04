console.log('Twitter Bot Activate!');

const Twit = require('twit');
const config = require('./config.js');
const fs = require('fs'); 

let T = new Twit(config);

//get and post tweet --------------------------------------------------------
function getTweet(keyword) {
	T.get('search/tweets', { q: `${keyword} since:2017-06-01`, count: 10 }, function(err, data, response) {
	  let tweets = data.statuses.map(message => message.text);
	  console.log(tweets);
	});	
}
//getTweet('messi');

function postTweet(tweet) {
	T.post('statuses/update', tweet, function(err, data, response) {
	  err ? console.log('something went wrong') : console.log('operation success')
	}); 
}
//postTweet({status: 'hello world!'});


//Tweet in a time intervel -----------------------------------
function randomTweet() {
	let randomMessage = Math.floor(Math.random() * 100);
	let tweet = {
		status: 'A lucky number: ' + randomMessage + ' from node.js app'
	}
	postTweet(tweet);
}
//randomTweet();
//setInterval(randomTweet, 1000 * 10);


// tweet image-------------------------------------------------------------------------------------
let imagePath = './img/coding2.jpg';
function imageTweet(image) {
	let b64content = fs.readFileSync(image, { encoding: 'base64' });

	T.post('media/upload', {media_data: b64content}, (err, data, response) => {
  	let meta_params = { media_ids: data.media_id_string, status: "image from node.js app" };
  	postTweet(meta_params);
	})
}
imageTweet(imagePath);


// tweetbot reply----------------------------------------------------------------------------------
