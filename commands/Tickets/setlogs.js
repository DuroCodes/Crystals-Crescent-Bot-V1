const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

    let channel = message.mentions.channels.first();
    if (!channel || channel.type !== "text") return functions.errorEmbed(message, message.channel, "Please input the correct arguments.");

    let channelFetched = message.guild.channels.cache.find(c => c.id === channel.id);
    if (!channelFetched || channelFetched.type !== "text") return functions.errorEmbed(message, message.channel, "Please input the correct arguments.");

    let embed = new Discord.MessageEmbed()
        .setAuthor(`✅ | Successful Change`)
        .setColor(color.none)
        .setTimestamp()
        .setFooter(`Ticket System`, bot.user.displayAvatarURL())
        .addField(`New Channel`, channelFetched, true)
        .addField(`Admin Changed`, message.author, true)
        .addField(`Date`, `\`${dateFormat(new Date(), "mm/dd/yyyy - HH:MM:ss")}\``, true);

    db.set(`logs_${message.guild.id}`, channelFetched.id);
    channelFetched.send(message.author, { embed: embed });
    functions.successEmbed(message, message.channel, `The \`logs\` channel has been set to ${channelFetched}`);

}

exports.help = {
    name: "setlogs",
    aliases: ['logs', 'channel'],
    description: 'Sets the logs channel for the ticket system.'
}