const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const {Client,Collection} = require('discord.js');
const {
    TOKEN,PREFIX,OAuth2_URL,PERM_CODE,SCOPE,CLIENT_ID,CLIENT_SECRET,REDIRECT_URL
} = require('./config');

client.queue = new Map(); //For Music Queue List
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
client.event = new Collection();
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
    console.log(`Logged In As ${client.user.username}`)
    client.user.setActivity("n!", {type: "STREAMING", url: "https://twitch.tv/mrjanggo858"})
});

client.on('message', async(message) => {
    let prefix = PREFIX;
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
})

client.login(TOKEN);


const http = require('http');
const url = require('url');
const fetch = require('node-fetch');

let port = 3000;


http.createServer((req, res) => {
	let responseCode = 404;
	let content = '404 Error';

	const urlObj = url.parse(req.url, true);

	if (urlObj.query.code) {
		const accessCode = urlObj.query.code;
		const data = {
			client_id: CLIENT_ID,
			client_secret: CLIENT_SECRET,
			grant_type: PERM_CODE,
			redirect_uri: REDIRECT_URL,
			code: accessCode,
			scope: SCOPE,
		};

		fetch('https://discordapp.com/api/oauth2/token', {
			method: 'POST',
			body: new URLSearchParams(data),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		})
			.then(discordRes => discordRes.json())
			.then(info => {
				console.log(info);
				return info;
			})
			.then(info => fetch('https://discordapp.com/api/users/@me', {
				headers: {
					authorization: `${info.token_type} ${info.access_token}`,
				},
			}))
			.then(userRes => userRes.json())
			.then(console.log);
	}

	if (urlObj.pathname === '/') {
		responseCode = 200;
		content = fs.readFileSync('./views/index.ejs');
	}

	res.writeHead(responseCode, {
		'content-type': 'text/html;charset=utf-8',
	});

	res.write(content);
    res.end();  
})
    .listen(port);
    console.log(`Listening To Port ${port}`)