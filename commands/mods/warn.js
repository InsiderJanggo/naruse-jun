const { MessageEmbed } = require("discord.js");

module.exports =  {
    name: "warn",
    aliases: ["peringatan", "Warn"],
    category: "mods",
    description: "Warn Mentioned User",
    usage: "<mention> <reason>",
    run: async(bot,message,args) => {
        let user = message.mentions.users.first();
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have premission to do that!");
        let botico = bot.user.displayAvatarURL();
        let reason = args.join(" ").slice(22);
        if (message.mentions.users.size < 1) return message.reply('You must mention someone to warn them.');
        if (reason.length < 1) return message.reply('You must have a reason for the warning.');

    
        let userembed = new MessageEmbed()
        .setTitle("Warn")
        .setColor("PURPLE")
        .setDescription(`You have been warned on \`${message.guild.name}\``)
        .setTimestamp()
        .addField("Warned by", message.author.tag)
        .addField("Reason", reason)
        .setAuthor("Naruse Jun", botico);
        user.send(userembed);

        message.delete();

        let embed = new MessageEmbed()
        .setTitle("Warned")
        .setColor("YELLOW")
        .setTimestamp()
        .setDescription(`${user} Has Been Warned Because ${reason}`)
        .setAuthor("Naruse Jun", botico)
        message.channel.send({embed});
    },
};