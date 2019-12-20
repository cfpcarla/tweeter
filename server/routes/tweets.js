"use strict";

const userHelper = require("../lib/util/user-helper")
const express = require('express');
const tweetsRoutes = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(request, response) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        response.status(500).json({ error: err.message });
      } else {
        response.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(request, response) {
    if (!request.body.text) {
      response.status(400).json({ error: 'invalid request: no data in POST body' });
      return;
    }

    const user = request.body.user ? request.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: request.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        response.status(500).json({ error: err.message });
      } else {
        response.status(201).send();
      }
    });
  });

  return tweetsRoutes;

};
