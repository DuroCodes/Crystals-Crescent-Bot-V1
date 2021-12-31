const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  let helpEmbed = new Discord.MessageEmbed()
    .setTitle("**Crystals Crescent IP**")
    .setColor(color.purple)
    .setDescription("**Server IP/Address:** play.crystals-crescent.com\n**Bedrock Port:** 19132")
    .setFooter(`Crystals Crescent Bot`, bot.user.displayAvatarURL())
    .setTimestamp();

  message.delete();
  message.channel.send(helpEmbed)

}
exports.help = {
  name: "ip",
  aliases: [],
  description: 'Displays server ip.'
}