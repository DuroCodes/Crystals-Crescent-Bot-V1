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
      .setAuthor('SkyWars Stats', bot.user.displayAvatarURL())
      .setDescription(`\`[${player.rank}] ${player.nickname}\``)
      .setColor(color.green)
      .setFooter('SkyWars Stats', bot.user.displayAvatarURL())
      .setTimestamp()
      .setImage('https://hypixel.net/styles/hypixel-v2/images/game-icons/Skywars-64.png')
      .addField('Level:', player.stats.skywars.level, true)
      .addField('Heads:', commaNumber(player.stats.skywars.heads), true)
      .addField('KD Ratio:', player.stats.skywars.KDRatio, true)
      .addField('WL Ratio:', player.stats.skywars.WLRatio, true)
      .addField('Coins:', commaNumber(player.stats.skywars.coins), true)
      .addField('Total Deaths:', commaNumber(player.stats.skywars.deaths), true)
      .addField('Total Kills:', commaNumber(player.stats.skywars.kills), true)
      .addField('Winstreak:', commaNumber(player.stats.skywars.winstreak), true)
      .addField('Total Wins:', commaNumber(player.stats.skywars.wins), true)
      .addField('Tokens:', commaNumber(player.stats.skywars.tokens), true)
      .addField('Prestige:', player.stats.skywars.prestige, true)
      .addField('Souls:', commaNumber(player.stats.skywars.souls), true)
      .addField('Ranked Kills:', commaNumber(player.stats.skywars.ranked.kills), true)
      .addField('Ranked Losses:', commaNumber(player.stats.skywars.ranked.losses), true)
      .addField('Ranked Games Played:', commaNumber(player.stats.skywars.ranked.played), true)
      .addField('Ranked Wins:', commaNumber(player.stats.skywars.ranked.wins), true)
      .addField('Ranked KD Ratio:', player.stats.skywars.ranked.KDRatio, true)
      .addField('Ranked WL Ratio:', player.stats.skywars.ranked.WLRatio, true)

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
  name: "sw-stats",
  aliases: ['sw', 'skywars'],
  description: "Returns a user's skywars stats."
}