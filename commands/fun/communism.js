const Discord = require('discord.js');
const AlexAPI = require('alexflipnote.js')
const AlexClient = new AlexAPI()
const customisation = require('../../config.js');

module.exports = {
    name: 'communism',
    description: 'Bring Motherland Back',
    usage: '[mention]',
    category: "fun",
    aliases: ["red", "soviet", "russia"],
    run: async(client,message,args) => {
        let msg = await message.channel.send('Please Wait...');
        let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL({dynamic: true, size: 2048 }) : message.author.avatarURL({ dynamic: true, size: 2048 });
        let link = await AlexClient.image.communist({image: avatar});
        const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setImage(link) 
        .setFooter(`© Naruse Jun Bot by ${customisation.OWNER}`);
        message.channel.send({embed});
        msg.delete();
    }
}
