var express = require('express');
var request = require('request');
var timers = require('timers');
var http = require('http');


global.ArticleBodyObj;

function getArticles() {
    var options = {
        host: 'altingetpraktik.azurewebsites.net',
        port: 80,
        path: '/Articles/DetailsTop5',
        method: 'GET'
    };
    
    http.request(options, function(res) {
        var body = '';
    
        res.on('data', function(chunk) {
            body+= chunk;
        });
    
        res.on('end', function() {
            ArticleBodyObj = JSON.parse(body);
            console.log(ArticleBodyObj);
        })
    }).end();
}

module.exports.getArticles = getArticles;