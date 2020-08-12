const request = require('node-superfetch');
const {MessageEmbed} = require('discord.js');
const utility = require("../../utils/utils.js");

module.exports = {
    name: "manga",
    description: "Get Manga Info From kitsu.io",
    aliases: ["mangainfo", "infomanga", "manga-info"],
    category: "search",
    run: async(bot,message,args) => {
        const query = args.join(' ');
        const { text } = await request
				.get('https://kitsu.io/api/edge/manga')
				.query({ 'filter[text]': query });
			const body = JSON.parse(text);
			if (!body.data.length) return message.reply('Could not find any results.');
			const data = body.data[0].attributes;
			const embed = new MessageEmbed()
				.setColor(0xF75239)
				.setAuthor('Kitsu.io', 'https://i.imgur.com/lVqooyd.png', 'https://kitsu.io/explore/manga')
				.setURL(`https://kitsu.io/manga/${data.slug}`)
				.setThumbnail(data.posterImage ? data.posterImage.original : null)
				.setTitle(data.canonicalTitle)
				.setDescription(utility.shorten(data.synopsis))
				.addField('❯ Type', `${data.subtype} - ${data.status}`, true)
				.addField('❯ Volumes / Chapters', `${data.volumeCount || '???'} / ${data.chapterCount || '???'}`, true)
				.addField('❯ Start Date', data.startDate ? new Date(data.startDate).toDateString() : '???', true)
				.addField('❯ End Date', data.endDate ? new Date(data.endDate).toDateString() : '???', true);
			return message.channel.send(embed).catch(console.error);   
    },
};