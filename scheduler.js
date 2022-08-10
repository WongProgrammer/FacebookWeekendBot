const schedule = require('node-schedule');
const facebook = require('./facebook');
const tweet = require('./tweet');

let count = 0;
// At minute 0 past every hour from 0 through 23 on Friday.
const friday = schedule.scheduleJob('0 0-23 * * 5', () => {
    tweet.getTweet().then(res => {
        let tweetDate = formatDate(res.created_at);
        let today = formatDate(new Date());
        if(tweetDate === today && count == 0) {
            facebook.weekend(res.text);
            count++;
            console.log("Success");
        } else {
            console.log("Not yet =/")
        }
    });
    
});

//Resets count on saturday
const job = schedule.scheduleJob('0 0 * * 6', () => {
    count = 0;
});

function formatDate(inputDate) {
    var formattedDate = new Date(inputDate);
    var dd = String(formattedDate.getDate()).padStart(2, '0');
    var mm = String(formattedDate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = formattedDate.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
}
