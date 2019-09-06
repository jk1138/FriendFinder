var path = require('path');
var express = require("express");

module.exports = function (app) {

    app.use(express.static(__dirname + '/../public'));

    //Sends user to survey.html
    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    //Sends user to home page if they go to any url path that isn't already defined
    app.use(function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
}