const {MessageEmbed, User} = require('discord.js');

module.exports = {
    name: "user",
    description: "Return User Information",
    usage: "[mention]",
    aliases: ["orang","manusia","userinfo","infoorang"],
    category: "user",
    run: async(bot,message,args) => {
        let user = message.mentions.users.first() || message.author;
        //let role =  user.roles ? user.roles.map(r => `${r}`).join(' | ') : "";
        let userico = user.displayAvatarURL();
        let botico = bot.user.displayAvatarURL();
        let embed = new MessageEmbed()
        .setTitle(`${user.username} Information`)
        .setThumbnail(userico)
        .addField("Status", user.presence.status)
        .addField('Playing', user.presence.game)
        .addField("Created", user.createdAt)
        .setTimestamp()
        .setFooter("Naruse Jun", botico)
        .setColor('PURPLE')
        .setAuthor("Naruse Jun", botico)
        message.channel.send(embed);
    },
};