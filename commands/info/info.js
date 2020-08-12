const os = require('os');
const osutils = require('os-utils')
const {MessageEmbed} = require('discord.js')


const fs = require('fs');
const {OWNER} = require('../../config');

module.exports = {
    name: "info",
    aliases: ["botinfo", "infobot", "bot-info", "info-bot", "status"],
    usage: "Return Bot Information And Status",
    category: "info",
    run: async(bot,message,args) => {
        var millisecond = parseInt((bot.uptime % 1000) / 100),
        seconds = parseInt((bot.uptime / 1000) % 60),
        minutes = parseInt((bot.uptime / (1000 * 60)) % 60),
        hours = parseInt((bot.uptime / (1000 * 60 * 60)) % 24),
        days = parseInt((bot.uptime / (1000 * 60 * 60 * 24)) % 60);


        days = (days < 10) ? "0" + days : days;
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;


        fs.readdir("./commands/", (err, files) => {
            if(err) console.error(err);
            tocmds = files.length;
        });

        osutils.cpuUsage(function(v) {
            const embed = new MessageEmbed()
            .setColor("PURPLE")
            .setThumbnail(bot.user.displayAvatarURL())
            .setURL(bot.user.displayAvatarURL())
            .setTimestamp()
            .addField("Stats:", "Show The Bot Status")
            .addField("------------------------------------------------", "------------------------------------------------------------")
            .addField("--------------------------------------------------------------------------------","------------------------------------------------------------------------------")
            .addField("Platform", osutils.platform(),true)
            .addField("VPS CPU Cores", osutils.cpuCount() + " Cores",true)
            .addField("CPU Usage", `${(v * 100).toString().split(".")[0] + "." + (v * 100).toString().split(".")[1].split('')[0] + (v * 100).toString().split(".")[1].split('')[1]}%`,true)
            .addField("Total Memory", osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB",true)
            .addField("RAM Usage Of VPS", `${(osutils.totalmem() - osutils.freemem()).toString().split(".")[0] + "." + ( osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[0] + (osutils.totalmem() - osutils.freemem()).toString().split(".")[1].split('')[1]}/${osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1]}MB`,true)
            .addField("RAM Usage Of Bot", (process.memoryUsage().heapUsed / 1024 / 1024 ).toFixed(2) + "MB/" + osutils.totalmem().toString().split(".")[0] + "." + osutils.totalmem().toString().split(".")[1].split('')[0] + osutils.totalmem().toString().split(".")[1].split('')[1] + "MB",true)
            .addField("RAM Usage Of VPS %", `${(100 - osutils.freememPercentage() * 100).toString().split(".")[0] + "." + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[0] + (100 - osutils.freememPercentage() * 100).toString().split(".")[1].split('')[1]}%`,true)
            .setFooter(`© Naruse Jun Bot by ${OWNER}`);
            message.channel.send({embed});
        });
    },
};