require('dotenv').config();
import * as Discord from 'discord.js';
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;

import * as https from 'https';

import {readFileSync, writeFile} from 'fs';

var curseCount = parseInt(readFileSync("curseCount.carlson").toString());
var pushupCount = parseInt(readFileSync("pushupCount.carlson").toString());


let commandList = 
{
	'>help': function(msg, args: string[])
	{
		msg.channel.send
		(
		"Possible commands:\n" +
		"\t	>dadjoke - Spits out a good joke.\n" +
		"\t	>help - Sends this message.\n" +
		"\t	>help [command] - Provides help on specified command.\n"
		);
	},

	'>dadjoke': function(msg, args: string[])
	{
		https.get('https://icanhazdadjoke.com/slack', resp => 
		{
			let data = '';
	
			resp.on('data', (chunk) => {data += chunk;});
			resp.on('end', () => { msg.channel.send(JSON.parse(data).attachments[0].text)});
		}).on("error", (err) => {console.log(err); msg.channel.send('no can has dad :(');});	
	},

	'>badnik': function(msg, args: string[])
	{
		let count = args.length > 0 ? parseInt(args[0]) : 1;

		if (isNaN(count))
		{
			msg.channel.send("!Ay caramba!");
			return -1;
		}
		
		curseCount += count;
		pushupCount += 10 * count;

		msg.channel.send("He's cursed " + curseCount + " time" + (curseCount == 1 ? "" : "s") + ".");

		writeFile('pushupCount.carlson', pushupCount.toString(), (err) => { if (err) throw err; })
		writeFile('curseCount.carlson', curseCount.toString(), (err) => { if (err) throw err; })
	},

	'>nikpushup': function(msg, args: string[])
	{
		let count = args.length > 0 ? parseInt(args[0]) : 1;
		
		if (isNaN(count))
		{
			msg.channel.send("!Ay caramba!");
			return -1;
		}
		
		pushupCount -= count;

		msg.channel.send("Removed " + count + " pushups. Now only " + pushupCount + " pushups remain.");

		writeFile('pushupCount.carlson', pushupCount.toString(), (err) => { if (err) throw err; })
	}
}


bot.login(TOKEN);

bot.on('ready', () => {
	console.info(`Logged in as ${bot.user.tag}!`);	
});

bot.on('message', msg => {
	const args = msg.content.split(/ +/);
	const command = args.shift().toLowerCase();

	if (command in commandList)
	{
		commandList[command](msg, args);
	}
});
