const Discord = require("discord.js");
const fs = require("fs");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  if (message.channel.name.includes('ticket-')) {
    if (message.member.roles.cache.some(role => role.name === '꒰Support Team꒱')) {

      const claimedBy = message.member.user.id

      let successEmbed = new Discord.MessageEmbed()
        .setTitle("✅ | Ticket Claimed")
        .setDescription(`You will now be assisted by <@${claimedBy}>!`)
        .setColor(color.green);

      const role = message.guild.roles.cache.find(r => r.name === "꒰Support Team꒱");
      const role2 = message.guild.roles.cache.find(r => r.name === "「 Mod 」" || "Mod")
      const role3 = message.guild.roles.cache.find(r => r.name === "「 Jr. Mod 」" || "Jr. Mod")

      message.channel.updateOverwrite(message.member.user.id, { VIEW_CHANNEL: true });

      message.channel.updateOverwrite(role, { VIEW_CHANNEL: false });
      message.channel.updateOverwrite(role2, { VIEW_CHANNEL: false });
      message.channel.updateOverwrite(role3, { VIEW_CHANNEL: false });

      message.delete();
      message.channel.send(successEmbed)

    } else return functions.errorEmbed(message, message.channel, "You do not have the `꒰Support Team꒱` role.");
  }

}
exports.help = {
  name: "claim",
  aliases: ['cl'],
  description: 'Claims a ticket.'
}