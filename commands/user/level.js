const Discord = require('discord.js');

module.exports = {
    name: "level",
    description: "displays info about user xps and their current level",
    aliases: ["xp"],
    category: "user",
    usage: '[mention]',
    run: async(bot,message,args) => {
        let target = message.mentions.users.first() || message.author;
        
        console.log(target);
        console.log(target.username);
    },
};