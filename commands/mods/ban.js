const {MessageEmbed} = require('discord.js');

module.exports = {
    name: "ban",
    description: "Ban Mentioned User",
    usage: "<mention><reason>",
    aliases: ["b"],
    category: "mods",
    run: async(client,message,args) => {
        if (!message.mentions.users.size) {
            return message.reply('You need to tag a user in order to ban them!');
        } else {
            let toBan = message.mentions.users.first();
            let reason = args.join(" ").slice(22);
            let server = message.guild;

            if (!toBan) {
                message.channel.send('Can\'t find user!');
            }
            if(!toBan === message.author) return message.channel.send(`You Cant Ban Yourself`);
            if(!reason) return message.channel.send(`${message.author} Please Provided A Reason`);
         
            if (!message.member.hasPermission('MANAGE_MESSAGES')) {
                return message.channel.send('Sorry You Dont Have Permission To Kick');
            }
            let inline = true;
            let embed = new discord.MessageEmbed()
            .setTitle(`**Banned**`)
            .setColor('RED')
            .setDescription(`**You Were Banned From ${server.name}**`)
            .addField('Banned By', `${message.author.tag}`, inline)
            .addField('Reason:', reason)
            .setTimestamp()
            toBan.send(embed);
            let modlog = message.guild.channels.cache.find(ch => ch.name === 'mod-log');
    
            let banEmbed = new discord.MessageEmbed()
            .setTitle('**Ban**')
            .setColor('RED')
            .addField('Kicked User', `${toBan} with ID: ${toBan.id}`)
            .addField('Kicked By', `<@${message.author.id}> with ID: ${message.author.id}`)
            .addField('Kicked From', `${message.channel}`)
            .addField('Reason', `${reason}`)
            .setTimestamp(new Date())
            .setFooter('RIP');

            if(!modlog) {
                return message.channel.send('Can\'t find mod-log channel');
            }

            message.guild.member(toBan).ban(reason);
            modlog.send(banEmbed);
        }
        message.delete();
    },
};