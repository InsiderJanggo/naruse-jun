const {MessageEmbed} = require('discord.js');
const {OWNER} = require('../../config');

module.exports = {
    name: "botserver",
    aliases: ["serverbot", "serverlist"],
    category: "info",
    usage: "[none]",
    description: "Show How Many Server The Bot Join",
    run: async(bot,message,args) => {
        let serverlist = ''
        bot.guilds.cache.forEach((guild) => {
            serverlist = serverlist.concat(" - " + guild.name + ": ID: " + guild.id + "\n")
        })
    
        const embed = new MessageEmbed()
        .setColor(Math.floor(Math.random()*16777215))
        .setTitle("Servers that have Naruse Jun Bot", '')
        .setDescription(serverlist)
        .setFooter(`© Naruse Jun Bot by ${OWNER}`);
    
        message.channel.send({embed});
    },
};