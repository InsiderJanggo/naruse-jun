const { MessageEmbed } = require("discord.js");

module.exports =  {
    name: "warn",
    aliases: ["peringatan", "Warn"],
    category: "mods",
    description: "Warn Mentioned User",
    usage: "<mention> <reason>",
    run: async(bot,message,args) => {
        let user = message.mentions.users.first();
        let ico = user.displayAvatarURL();
        let botico = bot.user.displayAvatarURL();
        let reason = args.join(" ").slice(22);
        if(!user) return message.channel.send(`${mesage.author} Please Mention A User`);
        if(!reason) return message.channel.send("Please Provided A Reason");
        let embed = new MessageEmbed()
        .setTitle("Warned")
        .setColor("YELLOW")
        .setThumbnail(ico)
        .setTimestamp()
        .setDescription(`${user} Has Been Warned Because ${reason}`)
        .setAuthor("Naruse Jun", botico)
        message.channel.send({embed});
    },
};