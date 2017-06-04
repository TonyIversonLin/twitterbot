let Twit = require('twit');

// this is tie to a particlar twiter account
let T = new Twit({
  consumer_key:         process.env.TWITTER_BOT_KEY,
  consumer_secret:      process.env.TWITTER_BOT_SECRET,
  access_token:         process.env.TWITTER_BOT_TOKEN,
  access_token_secret:  process.env.TWITTER_BOT_TOKEN_SECRET,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})