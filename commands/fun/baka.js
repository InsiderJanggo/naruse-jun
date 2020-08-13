const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "baka",
    description: "Say The Mentioned User Baka",
    usage: "<mention>",
    category: "fun",
    aliases: ["bk"],
    run: async(bot,message,args) => {
        let ment = message.mentions.users.first();

        if(!ment) return message.channel.send(`${message.author}, Please Mention A User`);
        let embed = new MessageEmbed()
        .setTitle(`${ment} BAKA`)
        .setImage()
        message.channel.send({embed});
    },
}