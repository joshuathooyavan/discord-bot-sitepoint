module.exports = {
	name: '=>dadJoke',
	description: 'Spits out a dad joke from API',
	execute(msg, args) {
		// const https = require('https');	//	BAD BADB BAD CODE

		// https.get('https://icanhazdadjoke.com/slack', (resp) => {
		// 	let data = '';

		// 	// A chunk of data has been recieved.
		// 	resp.on('data', (chunk) => {
		// 		data += chunk;
		// 	});

		// 	// The whole response has been received. Print out the result.
		// 	resp.on('end', () => {
		// 		msg.channel.send(JSON.parse(data).text);
		// 	});

		// }).on('error', (err) => {
		// 	msg.channel.send('no dad joke :/ got sum err');
		// 	console.log('dadJoke hit err: ' + err);
		// },);		
		msg.channel.send('pong, intentional ' + args);
	},
};