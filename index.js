"use strict";
exports.__esModule = true;
require('dotenv').config();
var Discord = require("discord.js");
var bot = new Discord.Client();
var TOKEN = process.env.TOKEN;
var https = require("https");
var fs_1 = require("fs");
///****** express app, for heroku site
var express = require('express');
var app = express();
app.get('/', function (req, res) {
    res.send('hello world');
});
app.listen(3000);
///******
var curseCount = parseInt(fs_1.readFileSync("curseCount.carlson").toString());
var pushupCount = parseInt(fs_1.readFileSync("pushupCount.carlson").toString());
var commandList = {
    '>help': function (msg, args) {
        msg.channel.send("Possible commands:\n" +
            "\t	>dadjoke - Spits out a good joke.\n" +
            "\t	>help - Sends this message.\n" +
            "\t	>help [command] - Provides help on specified command.\n");
    },
    '>dadjoke': function (msg, args) {
        https.get('https://icanhazdadjoke.com/slack', function (resp) {
            var data = '';
            resp.on('data', function (chunk) { data += chunk; });
            resp.on('end', function () { msg.channel.send(JSON.parse(data).attachments[0].text); });
        }).on("error", function (err) { console.log(err); msg.channel.send('no can has dad :('); });
    },
    '>badnik': function (msg, args) {
        var count = args.length > 0 ? parseInt(args[0]) : 1;
        if (isNaN(count)) {
            msg.channel.send("!Ay caramba!");
            return -1;
        }
        curseCount += count;
        pushupCount += 10 * count;
        msg.channel.send("He's cursed " + curseCount + " time" + (curseCount == 1 ? "" : "s") + ".");
        fs_1.writeFile('pushupCount.carlson', pushupCount.toString(), function (err) { if (err)
            throw err; });
        fs_1.writeFile('curseCount.carlson', curseCount.toString(), function (err) { if (err)
            throw err; });
    },
    '>nikpushup': function (msg, args) {
        var count = args.length > 0 ? parseInt(args[0]) : 1;
        if (isNaN(count)) {
            msg.channel.send("!Ay caramba!");
            return -1;
        }
        pushupCount -= count;
        msg.channel.send("Removed " + count + " pushups. Now only " + pushupCount + " pushups remain.");
        fs_1.writeFile('pushupCount.carlson', pushupCount.toString(), function (err) { if (err)
            throw err; });
    }
};
bot.login(TOKEN);
bot.on('ready', function () {
    console.info("Logged in as " + bot.user.tag + "!");
});
bot.on('message', function (msg) {
    var args = msg.content.split(/ +/);
    var command = args.shift().toLowerCase();
    if (command in commandList) {
        commandList[command](msg, args);
    }
});
