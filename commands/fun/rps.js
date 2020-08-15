const {MessageEmbed} = require('discord.js');
const chooseArr = ["🗻", "📰", "✂"];
const { promptMessage } = require("../../functions/function.js");

module.exports = {
	name: "rps",
	aliases: ["rockpaperscissor", "rpsgame"],
	description: "Play RockPaperScissor With Naruse",
	usage: '["🗻", "📰", "✂"]',
	category: "fun",
	run: async(bot, message, args) => {
		      const embed = new MessageEmbed()
            .setColor("#ffffff")
            .setFooter(message.guild.me.displayName, bot.user.displayAvatarURL)
            .setDescription("Add a reaction to one of these emojis to play the game!")
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);
        //await m.clearReactions();
        

        embed
            .setDescription("")
            .addField(result, `${reacted} vs ${botChoice}`);

        m.edit(embed);

        function getResult(me, clientChosen) {
            if ((me === "??" && clientChosen === "?") ||
                (me === "??" && clientChosen === "??") ||
                (me === "?" && clientChosen === "??")) {
                    return "You won!";
            } else if (me === clientChosen) {
                return "It's a tie!";
            } else {
                return "You lost!";
            }
        }
	},
};