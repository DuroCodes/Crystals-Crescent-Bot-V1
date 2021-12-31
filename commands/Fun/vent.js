const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

    var channel = bot.channels.cache.get('790430938097385493');

    let text = args.join(" ");
    if (!channel) return functions.errorEmbed(message, message.channel, "Please input a vent message.");

    message.delete();

    ventEmbed = new Discord.MessageEmbed()
        .setTitle("📝 | Vent")
        .setColor(color.black)
        .setDescription(text)
        .setFooter("Anonymous Vent")
        .setTimestamp();

    channel.send(ventEmbed)

}

exports.help = {
    name: "vent",
    aliases: ['v'],
    description: 'anonymous venting.'
}