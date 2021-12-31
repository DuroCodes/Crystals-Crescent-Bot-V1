const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  if (message.channel.name.includes('ticket-')) {
    if (message.member.roles.cache.some(role => role.name === '꒰Support Team꒱')) {

      var removedUser = message.mentions.users.first();
      if (!removedUser) return functions.errorEmbed(message, message.channel, "Please input a user to remove from the ticket.");

      let successEmbed = new Discord.MessageEmbed()
        .setTitle("✅ | User Removed")
        .setDescription(`Successfully removed <@${removedUser.id}> from this ticket!`)
        .setColor(color.green);

      message.channel.updateOverwrite(removedUser.id, { VIEW_CHANNEL: false });

      message.delete();
      message.channel.send(successEmbed)

    } else return functions.errorEmbed(message, message.channel, "You do not have the `꒰Support Team꒱` role.");
  }

}
exports.help = {
  name: "remove",
  aliases: ['r', 'rem'],
  description: 'Removes a user from a ticket.'
}