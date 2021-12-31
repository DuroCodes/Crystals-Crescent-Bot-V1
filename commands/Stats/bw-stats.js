const Discord = require('discord.js');
const HypixelAPIReborn = require('hypixel-api-reborn');
const apiKey = "API KEY"
const hypixelAPIReborn = new HypixelAPIReborn.Client(apiKey);
const commaNumber = require('comma-number');
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  if (!args[0]) {
    return functions.errorEmbed(message, message.channel, 'Please input a player.')
  }
  hypixelAPIReborn.getPlayer(args[0]).then((player) => {
    const embed = new Discord.MessageEmbed()
      .setAuthor('BedWars Stats', bot.user.displayAvatarURL())
      .setColor(color.green)
      .setFooter('BedWars Stats', bot.user.displayAvatarURL())
      .setTimestamp()
      .setDescription(`\`[${player.rank}] ${player.nickname}\``)
      .setImage('https://hypixel.net/styles/hypixel-v2/images/game-icons/BedWars-64.png')
      .addField('Level', `${player.stats.bedwars.level}✫`, true)
      .addField('KD Ratio:', player.stats.bedwars.KDRatio, true)
      .addField('Final KD Ratio:', player.stats.bedwars.finalKDRatio, true)
      .addField('WL Ratio:', player.stats.bedwars.WLRatio, true)
      .addField('Bed Breaks:', commaNumber(player.stats.bedwars.beds.broken), true)
      .addField('Beds Lost:', commaNumber(player.stats.bedwars.beds.lost), true)
      .addField('Bed BL Ratio:', player.stats.bedwars.beds.BLRatio, true)
      .addField('Coins:', commaNumber(player.stats.bedwars.coins), true)
      .addField('Total Deaths:', commaNumber(player.stats.bedwars.deaths), true)
      .addField('Final Deaths:', commaNumber(player.stats.bedwars.finalDeaths), true)
      .addField('Total Kills:', commaNumber(player.stats.bedwars.kills), true)
      .addField('Total Final Kills:', commaNumber(player.stats.bedwars.finalKills), true)
      .addField('Winstreak:', commaNumber(player.stats.bedwars.winstreak), true)
      .addField('Total Wins:', commaNumber(player.stats.bedwars.wins), true)
      .addField('Iron Collected:', commaNumber(player.stats.bedwars.collectedItemsTotal.iron), true)
      .addField('Gold Collected:', commaNumber(player.stats.bedwars.collectedItemsTotal.gold), true)
      .addField('Diamonds Collected:', commaNumber(player.stats.bedwars.collectedItemsTotal.diamond), true)
      .addField('Emeralds Collected:', commaNumber(player.stats.bedwars.collectedItemsTotal.emerald), true)

    message.channel.send(embed);

  }).catch(e => { // error messages
    if (e.message === HypixelAPIReborn.Errors.PLAYER_DOES_NOT_EXIST) {
      return functions.errorEmbed(message, message.channel, 'This player did not show up in the API!')
    } else {
      if (args[0]) {
        return functions.errorEmbed(message, message.channel, 'An unknown error has occured')
      }
    }
  });

}

exports.help = {
  name: "bw-stats",
  aliases: ['bw', 'bedwars'],
  description: "Returns a user's bedwars stats."
}