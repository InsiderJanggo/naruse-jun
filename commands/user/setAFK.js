const fs = require('fs');

module.exports = {
    name: "setafk",
    aliases: ["afk","setAFK","SETafk","Setafk"],
    category: "user",
    usage: "<reason>",
    run: async(bot,message,args) => {
        let reason = args.join(" ").slice(0);
        if(!reason) {
            return message.channel.send(`${message.author}, Please Specified A Reason`)
        } else {
            message.channel.send(`Set You AFK Status To ${reason}`).catch(console.error);
            fs.readFileSync("./data/afklist.json");
        }
    },
};