const tokens = require('./tokens.json');
const {TwitterApi} = require('twitter-api-v2');
const appOnlyClient = new TwitterApi(tokens.bearerToken);

const craig = "CraigWeekend";

async function getTweet() {
    // const tweet = await appOnlyClient.v2.search(`from:${craig}`);
    const tweet = await appOnlyClient.v2.search(`from:${craig}`,{
        'tweet.fields': ['created_at'],
    });
    const meme = tweet.data.data[0];
    
    return meme;
}

module.exports.getTweet = getTweet;
