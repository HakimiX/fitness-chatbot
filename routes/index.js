var express = require('express');
var request = require('request');
var timers = require('timers');
var schedule = require('node-schedule');
var http = require('http');
var router = express.Router();

var fbapi = require('../facebook/fbapi');
var api = require('../api/consume');

var mysql = require('mysql');

var token = "<token>";

// WIT AI
var wit_endpoint = '<endpoint>';
var wit_token = '<token>';

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
                case "generic":
                    fbapi.generic(sender);
                    break;
                case "stop":
                    fbapi.sendText(sender, "jeg stopper");
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
            fbapi.sendText(sender, "Hi! how can i help you?");
            break;
        case "help":
            fbapi.sendText(sender, "I am here to help!");
            break;
        case "chest":
            fbapi.sendChestExercises(sender);
            break;
        default:
            fbapi.sendText(sender, "I don't understand :(");
            break;
    }
}






module.exports = router;