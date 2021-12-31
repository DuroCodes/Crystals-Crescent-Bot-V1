const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  if (message.member.hasPermission("MANAGE_MESSAGES")) {
    let messagecount = parseInt(args[0]);

    if (isNaN(messagecount)) return functions.errorEmbed(message, message.channel, "Please enter the amount of messages you wish to delete.");

    if (messagecount > 100) {
      return functions.errorEmbed(message, message.channel, "You can only delete between 2 and 100 messages at one time.");
    } else if (messagecount < 2) {
      return functions.errorEmbed(message, message.channel, "You can only delete between 2 and 100 messages at one time.");
    } else {

    } {

      purgeEmbed = new Discord.MessageEmbed()
        .setTitle("**Messages Purged:**")
        .setColor(color.purple)
        .setDescription(`<@${message.author.id}> purged ${messagecount} messages in ${message.channel}`)
        .setTimestamp();

      message.channel.bulkDelete(messagecount);
      bot.channels.cache.get('806939435014160394').send(purgeEmbed)
    }
  } else {
    return functions.errorEmbed(message, message.channel, "You need to be an ADMINISTRATOR to do this command.");
  }
}

exports.help = {
  name: "purge",
  aliases: ['clear'],
  description: 'Purges a certain number of messages'
}