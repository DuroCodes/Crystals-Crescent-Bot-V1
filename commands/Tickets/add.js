const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  if (message.channel.name.includes('ticket-')) {
    if (message.member.roles.cache.some(role => role.name === '꒰Support Team꒱')) {

      var addedUser = message.mentions.users.first();
      if (!addedUser) return functions.errorEmbed(message, message.channel, "Please input a user to add to the ticket.");

      let successEmbed = new Discord.MessageEmbed()
        .setTitle("✅ | User Added")
        .setDescription(`Successfully added <@${addedUser.id}> to this ticket!`)
        .setColor(color.green);

      message.channel.updateOverwrite(addedUser.id, { VIEW_CHANNEL: true });

      message.delete();
      message.channel.send(successEmbed)

    } else return functions.errorEmbed(message, message.channel, "You do not have the `꒰Support Team꒱` role.");
  }

}
exports.help = {
  name: "add",
  aliases: ['a'],
  description: 'Adds a user to a ticket.'
}