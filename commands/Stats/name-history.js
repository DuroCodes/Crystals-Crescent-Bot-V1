const Discord = require('discord.js');
const fs = require("fs");
const db = require("quick.db");
const fetch = require('node-fetch');
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  if (!args[0]) return functions.errorEmbed(message, message.channel, 'Please input a player.')

  const playerUUIDFetch = await fetch(`https://api.mojang.com/users/profiles/minecraft/${args[0]}`);
  const playerUUIDData = await playerUUIDFetch.json();
  const playerNameHistory = await fetch(`https://api.mojang.com/user/profiles/${playerUUIDData.id}/names`);
  const playerNameData = await playerNameHistory.json();

  const embed = new Discord.MessageEmbed()
    .setAuthor(`${playerNameData[playerNameData.length - 1].name}'s Name History`, bot.user.displayAvatarURL())
    .setThumbnail(`https://play-lh.googleusercontent.com/pg9PlKqg7FXSiE0GA1H8YPt5GX_2VLf9Wv4rkWq5igUfenG7ZztgmQjHN8FEttvSY6S-`)
    .setColor(color.green)
    .setFooter('Name History', bot.user.displayAvatarURL())
    .setTimestamp();

  for (length in playerNameData) {
    for (key in playerNameData[length]) {
      if (key == 'name' && playerNameData[length].changedToAt == undefined) {
        embed.setDescription(`**Original Name:** \`${playerNameData[length][key]}\``)
      }
    }
  }

  for (length in playerNameData) {
    for (key in playerNameData[length]) {
      if (key == 'name') {
        if (playerNameData[length].changedToAt == undefined) {
          break;
        } else {
          const changedAtDate = new Date(playerNameData[length].changedToAt);
          const changedAt = changedAtDate.toLocaleString()
          embed.addField(`\`${playerNameData[length][key]}\``, `**Changed At:** \`${changedAt}\``, false)
        }
      }
    }
  }

  message.channel.send(embed);

}

exports.help = {
  name: "name-history",
  aliases: ['names', 'nh', 'name'],
  description: "Returns a user's name history."
}