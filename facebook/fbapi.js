var request = require('request');
var token = "<token>";
var calcBmi = require('bmi-calc');

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


function sendChestExercises(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Barbell Bench Press",
                    "subtitle": "Compound Movement",
                    "image_url": "https://www.muscleandperformance.com/.image/c_limit%2Ccs_srgb%2Cq_80%2Cw_630/MTQ1MzY2OTYxNjY4NTY0NzUz/bench-press.webp",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.altinget.dk/artikel/",
                        "title": "Læs mere"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Incline Barbell Bench Press",
                    "subtitle": "Compound Movement",
                    "image_url": "https://www.muscleandperformance.com/.image/c_limit%2Ccs_srgb%2Cq_80%2Cw_630/MTQ1MzY2OTYxNjY3MTg4NDk3/incline-bench-press.webp",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.altinget.dk/artikel/",
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
module.exports.sendChestExercises = sendChestExercises;
module.exports.generic = generic;
