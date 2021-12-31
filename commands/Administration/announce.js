const Discord = require("discord.js");
const fs = require("fs");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  if (message.member.hasPermission('ADMINISTRATOR') || message.member.roles.cache.some(r => r.name === "「 Build Manager 」") || message.member.roles.cache.some(r => r.name === "「 Social Media Manager 」") || message.member.roles.cache.some(r => r.name === "「 Event Manager 」")) {
    var channel = message.mentions.channels.first();
    if (!channel) return functions.errorEmbed(message, message.channel, "Please input a channel.");

    let text = args.slice(1).join(" ");
    if (!channel) return functions.errorEmbed(message, message.channel, "Please input an announcement message.");

    message.delete();

    const questions = [
      "Who would you like to ping?"
    ]
    let counter = 0

    const filter = m => m.author.id === message.author.id
    const collector = new Discord.MessageCollector(message.channel, filter, {
      max: questions.length,
      time: 1000 * 240
    })

    message.channel.send(questions[counter++])
    collector.on('collect', m => {
      if (counter < questions.length) {
        m.channel.send(questions[counter++])
      }
    })

    collector.on('end', collected => {
      let counter = 0

      announcementEmbed = new Discord.MessageEmbed()
        .setTitle("📢 | Announcement")
        .setColor(color.cyan)
        .setDescription(text)
        .setTimestamp()
        .setFooter("Announcement by " + message.member.user.tag, message.member.user.displayAvatarURL());

      collected.forEach((value) => {

        counter++
        if (counter === 1) channel.send(value.content, { embed: announcementEmbed })
      })
    })
  } else return functions.errorEmbed(message, message.channel, "You do not have `ADMINISTRATOR` permissions.")

}

exports.help = {
  name: "announce",
  aliases: ['a', 'ann'],
  description: 'Announce something to the server.'
}