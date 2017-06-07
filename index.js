console.log('Twitter Bot Activate!');

const Twit = require('twit');
const config = require('./config.js');
const fs = require('fs'); 

let T = new Twit(config);

//get and post tweet -------------------------------------------------------------------------------------
function getTweet(keyword) {
	T.get('search/tweets', { q: `${keyword} since:2017-06-01`, count: 10 }, function(err, data, response) {
	  let tweets = data.statuses.map(message => message.text);
	  console.log(tweets);
	});	
}
//getTweet('messi');

function postTweet(tweet) {
	T.post('statuses/update', tweet, function(err, data, response) {
	  err ? console.log('something went wrong',err) : console.log('operation success')
	}); 
}
//postTweet({status: 'hello world!'});


//Tweet in a time intervel --------------------------------------------------------------------------------
function randomTweet() {
	let randomMessage = Math.floor(Math.random() * 100);
	let tweet = {
		status: 'A lucky number: ' + randomMessage + ' from node.js app'
	}
	postTweet(tweet);
}
//randomTweet();
//setInterval(randomTweet, 1000 * 10);


// tweet image----------------------------------------------------------------------------------------------
function imageTweet(image) {
	let b64content = fs.readFileSync(image, { encoding: 'base64' });

	T.post('media/upload', {media_data: b64content}, (err, data, response) => {
  	let meta_params = { media_ids: data.media_id_string, status: "image from node.js app" };
  	postTweet(meta_params);
	})
}
//let imagePath = './img/coding2.jpg';
//imageTweet(imagePath);


// tweetbot reply-------------------------------------------------------------------------------------------
//let stream = T.stream('user');
function tweetReply(eventMsg) {

	let replyto = eventMsg.in_reply_to_screen_name;
	let text = eventMsg.text;
	let fromUser = eventMsg.user.screen_name;

	if(replyto === 'LINYECHAO') {
		console.log('about to reply tweet',fromUser);
		let newTweet ={status: '@' + fromUser + ' thanks for tweeting me!'};
		postTweet(newTweet);
	}
}
//stream.on('tweet', tweetReply);



//tweetbot get public user tweets-----------------------------------
function tweetGetPublicUser(name) {
	T.get('statuses/user_timeline', {screen_name: `${name}`, count: 3}, (err, data, response) => {
		err ? console.log('something went wrong',err) : console.log('operation success');
		let tweets = data.map(message => message.text);
	  console.log(tweets);
	})
} 
//tweetGetPublicUser('POTUS');



//tweetbot streaming tweet from certain user------------------------------
let watchList = {follow: ['1059621480', '872491740619472897']}
let streamWatch = T.stream('statuses/filter', watchList);
function watchUserTweet(eventMsg, err) {
	err ? console.log('something went wrong',err) : console.log('operation success');
	console.log('new tweet from watched user ---------------- \n',eventMsg);
}
streamWatch.on('tweet', watchUserTweet);