var request = require('request');
var token = "EAACptFlfBuIBAPyZAEhU1qt6gaSy3RenZAGlhJiwmkMw5qTJCNvgfkUmFDIAAjhOMIZAZCzA9WnsEXiKFAGKHmY3j6ZAzKeLx24CE7JLZCMiWHSuxw9s42rmBZAU5MJdPOE0OUaoF8HqnzZAZB4c1imEpc0wf0wunMViTUNcc1BLVlwOZBopIWRVlt";


function sendText(sender, text) {
    let messageData = {text: text}
    request({
        url: 'https://graph.facebook.com/v2.11/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData 
        }
    }, function(error, response, body) {
        if(error) {
            console.log('sending error')
        } else if(response.body.error) {
            console.log('response body error')
        }
    })
  } 


function sendMessage2(sender, text) {
    let messageData = {text: text}
    request({
        url: 'https://graph.facebook.com/v2.11/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: {id: sender},
            message: messageData 
        }
    }, function(error, response, body) {
        if(error) {
            console.log('sending error')
        } else if(response.body.error) {
            console.log('response body error')
        }
    })
}


function sendArticleMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": ArticleBodyObj[0].Headline,
                    "subtitle": ArticleBodyObj[0].CreateTime,
                    "image_url": "https://www.altinget.dk/images/article/149600/25205.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.altinget.dk/artikel/" + ArticleBodyObj[0].UrlKey,
                        "title": "Læs mere"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": ArticleBodyObj[1].Headline,
                    "subtitle": ArticleBodyObj[1].CreateTime,
                    "image_url": "http://ziremedia.com/wp-content/uploads/2017/04/mobile-optimized-1030x686.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.altinget.dk/artikel/" + ArticleBodyObj[1].UrlKey,
                        "title": "Læs mere",
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }, {
                    "title": ArticleBodyObj[2].Headline,
                    "subtitle": ArticleBodyObj[2].CreateTime,
                    "image_url": "https://www.altinget.dk/images/article/149598/25203.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.altinget.dk/artikel/" + ArticleBodyObj[2].UrlKey,
                        "title": "Læs mere",
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }, {
                    "title": ArticleBodyObj[2].Headline,
                    "subtitle": ArticleBodyObj[2].CreateTime,
                    "image_url": "https://www.altinget.dk/images/article/149597/25202.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.altinget.dk/artikel/" + ArticleBodyObj[2].UrlKey,
                        "title": "Læs mere",
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }, {
                    "title": ArticleBodyObj[3].Headline,
                    "subtitle": ArticleBodyObj[3].CreateTime,
                    "image_url": "https://www.altinget.dk/images/article/149596/25201.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.altinget.dk/artikel/" + ArticleBodyObj[3].UrlKey,
                        "title": "Læs mere",
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.11/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendPersonsMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Inger Støjberg, Politiker",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://www.venstre.dk/_Resources/Persistent/50355aeccd8d943149f213601b9d80dab6efbd0d/Inger%20St%C3%B8jberg-2202x2544-866x1000.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.altinget.dk/",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Johanne Schmidt Nielsen, Politiker",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://denoffentlige.dk/sites/default/files/johanne_schmidt-nielsen_foto_mark_knudsen.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.altinget.dk/",
                        "title": "web url",
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                
                  }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.11/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendHelp(sender) {
    let messageData = {
      "attachment": {
          "type": "template",
          "payload": {
              "template_type": "button",
              "text": "Jeg kan vise dig seneste nyheder fra Altinget. Du skal blot skrive at du vil have nyhederne eller trykke på nedenstående knap",
              "buttons": [{
                  "type": "postback",
                  "title": "Nyheder",
                  "payload": "Payload for first element in generic bubble",
              }]
          }
      }
  }
  request({
      url: 'https://graph.facebook.com/v2.11/me/messages',
      qs: {access_token:token},
      method: 'POST',
      json: {
          recipient: {id:sender},
          message: messageData,
      }
  }, function(error, response, body) {
      if (error) {
          console.log('Error sending messages: ', error)
      } else if (response.body.error) {
          console.log('Error: ', response.body.error)
      }
  })
}


function generic(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Deadlift",
                    "subtitle": "Compound Movement",
                    "image_url": "https://i.imgur.com/FCTSI9J.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.altinget.dk",
                        "title": "Read more"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "HIIT Cardio",
                    "subtitle": "Health",
                    "image_url": "https://i.imgur.com/dNo2ZB5.jpg",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.altinget.dk",
                        "title": "Read more",
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.11/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


module.exports.sendHelp = sendHelp;  
module.exports.sendPersonsMessage = sendPersonsMessage;
module.exports.sendText = sendText;
module.exports.sendMessage2 = sendMessage2;
module.exports.sendArticleMessage = sendArticleMessage;
module.exports.generic = generic;
