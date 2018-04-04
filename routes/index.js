var express = require('express');
var request = require('request');
var rssReader = require('feed-read');
var timers = require('timers');
var schedule = require('node-schedule');
var calcBmi = require('bmi-calc')
var http = require('http');
var router = express.Router();

var platform = require('../facebook/platform');
var api = require('../api/consume');

var mysql = require('mysql');

var token = "EAACptFlfBuIBAPyZAEhU1qt6gaSy3RenZAGlhJiwmkMw5qTJCNvgfkUmFDIAAjhOMIZAZCzA9WnsEXiKFAGKHmY3j6ZAzKeLx24CE7JLZCMiWHSuxw9s42rmBZAU5MJdPOE0OUaoF8HqnzZAZB4c1imEpc0wf0wunMViTUNcc1BLVlwOZBopIWRVlt";

// WIT AI
var wit_endpoint = 'https://api.wit.ai/message?v=12032018&q=';
var wit_token = 'D7FKRWLJRNYUKEACKGENJQG7EOLISSMJ';


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'verify_me') {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});

router.post('/webhook/', function (req, res) {
    messaging_events = req.body.entry[0].messaging;

    for (i = 0; i < messaging_events.length; i++) {
        event = req.body.entry[0].messaging[i];
        sender = event.sender.id;

        if (event.message && event.message.text) {
            text = event.message.text;

            switch (text) {
                case "artikler":
                    api.getArticles();
                    timers.setTimeout(() => platform.sendArticleMessage(sender), 2000);
                    break;
                case "generic":
                    platform.generic(sender);
                    break;
                case "stop":
                    platform.sendText(sender, "jeg stopper");
                    break;
                default:
                    callWithAI(text, function (err, intent) {
                        handleIntent(intent, sender);
                    })
            }

            //sendText(sender, text);
        }
        if (event.postback) {
            let text = JSON.stringify(event.postback)
        }
    }
    res.sendStatus(200);
});


// WIT AI Connection
function callWithAI(query, callback) {
    query = encodeURIComponent(query);
    request({
        uri: wit_endpoint + query,
        qs: {
            access_token: wit_token
        },
        method: 'GET'
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('Successfully got %s', response.body);
            try {
                body = JSON.parse(response.body)
                intent = body['entities']['intent'][0]['value']
                callback(null, intent)
            } catch (e) {
                callback(e)
            }
        } else {
            console.log(response.statusCode)
            console.error("Unable to send message. %s", error);
            callback(error)
        }
    });
}


// WIT AI Intents
function handleIntent(intent, sender) {
    switch (intent) {
        case "greeting":
            platform.sendText(sender, "Hi! how can i help you?");
            break;
        case "BMI":

            var height = 1.78;
            var weight = 72.57;
            var val = 1;
            platform.sendText(sender, val);

            break;
        case "help":
            platform.sendText(sender, "I am here to help!");
            break;
        default:
            platform.sendText(sender, "I don't understand :(");
            break;
    }
}






module.exports = router;