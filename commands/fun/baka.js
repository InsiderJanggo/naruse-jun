const Discord = require('discord.js');
const superagent = require('superagent');
const customisation = require('../../config');

module.exports = {
    name: 'baka',
    description: 'B..BAKAAA!',
    usage: '<mention>',
    category: "fun",
    aliases: ['goblok','idiot'],
    run: async(bot,message,args) => {
        if (!message.mentions.users.first()) return message.reply("You need to mention someone...");
        if(message.mentions.users.first().id === "332109764286742529") return message.reply('My Dev is not baka you b..BAKA >.>');
        const { body } = await superagent
        .get("https://nekos.life/api/v2/img/baka");
        
        const embed = new Discord.MessageEmbed()
        .setColor("#ff9900")
        .setTitle(`${message.mentions.users.first().username} YOU B..BAKAAAA!`)
        .setImage(body.url) 
        .setFooter(`© Naruse Jun Bot by ${customisation.OWNER}`);
        message.channel.send({embed})
    }
}