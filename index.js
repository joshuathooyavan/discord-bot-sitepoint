require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();

const TOKEN = process.env.TOKEN;

const https = require('https');


let commandList = 
{
	'>help': function(msg, args)
	{
		msg.channel.send
		(
		"Possible commands:\n" +
		"\t	>dadjoke - Spits out a good joke.\n" +
		"\t	>help - Sends this message.\n" +
		"\t	>help [command] - Provides help on specified command.\n"
		);
	},

	'>dadjoke': function(msg, args)
	{
		https.get('https://icanhazdadjoke.com/slack', resp => 
		{
			let data = '';
	
			resp.on('data', (chunk) => {data += chunk;});
			resp.on('end', () => { msg.channel.send(JSON.parse(data).attachments[0].text)});
		}).on("error", (err) => {console.log(err); msg.channel.send('no can has dad :(');});	
	}

	
};

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