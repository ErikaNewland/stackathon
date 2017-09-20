/**
 * nytimestream
 */

const _ = require('lodash'),
const app = express()
const express = require('express'),
const socketio = require('socket.io');

const nytimes_key = process.env.NYTIMES_KEY,
const poll_interval = process.env.POLL_TIME || 1000 * 60,
const heartbeat_timeout = 1000 * 30,
const seen = [],
const latest = [],
const sockets = [],
const streams = [];

/**
* look for new stories
*
* @param {Function} a callback that receives a new story
*/

function poll(f) {
    console.log("polling for new stories");
    nytimes(function (news) {
        _.each(news, function (i) {
            if (!_.include(seen, i.url)) {
                f(i);
                seen.push(i.url);
                // to avoid memory bloat, only remember last 1000 urls
                seen = _.last(seen, 1000);
            }
        });
    });
    setTimeout(poll, poll_interval, f);
};

/**
* fetch new stories from the NYTimes API
*
* @param {Function} a callback that receives current stories
*/

function nytimes(f) {
    options = {
        "host": "api.nytimes.com",
        "path": "/svc/news/v2/all/recent.json?api-key=" + nytimes_key
    };
    console.log("http://" + options.host + options.path);
    app.get(options, function (res) {
        var json = "";
        res.on('data', function (chunk) {
            json += chunk;
        });
        res.on('end', function () {
            if (res.statusCode == 200) {
                console.log(json);
                times = JSON.parse(json);
                latest = times.results.reverse().slice(10);
                f(latest);
            }
        });
    }).on('error', function (e) {
        console.log("error: " + e);
    });
}