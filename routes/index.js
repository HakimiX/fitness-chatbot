var express = require('express');
var request = require('request');
var rssReader = require('feed-read');
var timers = require('timers');
var schedule = require('node-schedule');
var http = require('http');
var router = express.Router();

var platform = require('../facebook/platform');
var api = require('../api/consume');

var mysql = require('mysql');

var token = "EAACptFlfBuIBAPyZAEhU1qt6gaSy3RenZAGlhJiwmkMw5qTJCNvgfkUmFDIAAjhOMIZAZCzA9WnsEXiKFAGKHmY3j6ZAzKeLx24CE7JLZCMiWHSuxw9s42rmBZAU5MJdPOE0OUaoF8HqnzZAZB4c1imEpc0wf0wunMViTUNcc1BLVlwOZBopIWRVlt";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/webhook/', function(req, res) {
  if (req.query['hub.verify_token'] === 'verify_me') {
    res.send(req.query['hub.challenge']);
  }
  res.send('Error, wrong validation token');
});

router.post('/webhook/', function (req, res) {
  messaging_events = req.body.entry[0].messaging;

  for(i = 0; i < messaging_events.length; i++) {
    event = req.body.entry[0].messaging[i];
    sender = event.sender.id;

    if(event.message && event.message.text) {
      text = event.message.text;
      
      switch(text) {
        case "hej":
          platform.sendText(sender, "virker");
          break;
        case "artikler":
          api.getArticles();
          timers.setTimeout(() => platform.sendArticleMessage(sender), 2000);
          break;
        case "stop":
          platform.sendText(sender, "jeg stopper");
          break;
        case "help":
          platform.sendHelp(sender);
          break;
        default:
          platform.sendText(sender, "jeg forstår ikke");
          break;
      }

      //sendText(sender, text);
    }
    if (event.postback) {
      let text = JSON.stringify(event.postback)
    }
  }
  res.sendStatus(200);
});



module.exports = router;
