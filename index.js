console.log('Twitter Bot Activate!');
let Twit = require('twit');
let config = require('./config.js');

let T = new Twit(config);