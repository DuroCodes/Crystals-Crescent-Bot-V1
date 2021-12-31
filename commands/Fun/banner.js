const Discord = require('discord.js')

require("discord-banner")();
const bot = new Discord.Client()

exports.run = async (bot, message, args, functions) => {

  const target = message.mentions.members.first()
  if (target) {
    const banner = await target.user.bannerURL()

    var embed = new Discord.MessageEmbed()
      .setAuthor(target.user.tag, target.user.displayAvatarURL())
      .setTitle("**Banner**")
      .setImage(banner)

    message.channel.send(embed)
  } else {
    const banner = await message.author.bannerURL()

    var embed = new Discord.MessageEmbed()
      .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
      .setTitle("**Banner**")
      .setImage(banner)

    message.channel.send(embed)
  }
};

exports.help = {
  name: "banner",
  aliases: [],
  description: "Returns a users' banner."
}