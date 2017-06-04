console.log('Twitter Bot Activate!');

let Twit = require('twit');
let config = require('./config.js');

let T = new Twit(config);

T.get('search/tweets', { q: 'messi since:2017-06-01', count: 10 }, function(err, data, response) {
  let tweets = data.statuses.map(message => message.text);
  console.log(tweets);
});

T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  let result = err || data || response;
	console.log(result);
})