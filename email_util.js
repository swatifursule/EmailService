const request = require('request');
const async   = require("async");
 
//request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
//  if (err) { return console.log(err); }
//  console.log(body.url);
//  console.log(body.explanation);
//});


// node.js : Mailgun via API

var apiBaseUrl = 'https://api.mailgun.net/v3/sandboxa734e1fcac97471580d527cae777e9d2.mailgun.org';

var apiBaseUrl2= 'https://api.sendgrid.com/v3/mail/send';
var apiKey     = 'key-de8cac6342166fb86adcd20d4afeac5f';
var from       = 'swatifursule@gmail.com';
var to         = 'swatifursule@gmail.com';
var subject    = 'Hello there';
var text       = 'Testing some Mailgun awesomness!';

var mailgunOpts = {
    url: apiBaseUrl + '/messages',
    headers: {
        Authorization: 'Basic ' + new Buffer('api:' + apiKey).toString('base64')
    },
    form: {
        from   : from,
        to     : to,
        subject: subject,
        text   : text
    }
};

var sendGridOpts = {
    url: apiBaseUrl2,
    headers: {
        Authorization: 'Basic ' + new Buffer('api:' + apiKey).toString('base64')
    },
    "personalizations": [{
	 "to": [{"email":"john.doe@example.com","name":"John Doe"}],
         "subject":"Hello, World!"}
         ],
         "from":{"email":"sam.smith@example.com","name":"Sam Smith"},
         "reply_to":{"email":"sam.smith@example.com","name":"Sam Smith"}
}
    

async.waterfall([
    function sendViaMailGun(next){
	request.post(mailgunOpts, function(err, response, body) {
	    console.log(err || body);
            next(err, body);
	});
    },
   function sendViaSendGrid(target, next){
     console.log("sending via sendgrid");
        request.post(sendGridOpts, function(err, response, body) {
            console.log(err || body);
        });

   }
],
        function (err) {
            if (err) {
                console.error("Unable to send " + err);
                //c(err);
            } else {
                console.log("Sent");
            }
        }
);
