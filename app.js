const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const {Client,Collection} = require('discord.js');
const {
    TOKEN,PREFIX,OAuth2_URL,PERM_CODE,SCOPE,CLIENT_ID,CLIENT_SECRET,REDIRECT_URL,
    MY_SQL_HOST,MY_SQL_DATA,MY_SQL_PASS,MY_SQL_USER,MONGODB_DATA,MONGODB_HOST,MONGODB_PASS,MONGODB_USER
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
    client.user.setActivity("n! | narusejun.xyz", {type: "STREAMING", url: "https://twitch.tv/mrjanggo858"})
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


const express = require('express');
const app = express();

let port = 3000;

app.set('port', port);

const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(session({
    secret: '48738924783748273742398747238',
    resave: false,
    saveUninitialized: false,
    expires: 604800000,
}));
require('./router')(app);
app.listen(port, () => console.info(`Listening on port ${port}`));


const mysql = require('mysql');
const mongoose = require('mongoose');

// set up the mysql account info
const con = mysql.createConnection({
    host: MY_SQL_HOST,
    user: MY_SQL_USER,
    password: MY_SQL_PASS
});
