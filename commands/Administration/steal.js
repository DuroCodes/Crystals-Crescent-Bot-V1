const { Util } = require('discord.js')

exports.run = async (bot, message, args, functions) => {

  if (!message.member.hasPermission('ADMINISTRATOR')) return functions.errorEmbed(message, message.channel, "You do not have `ADMINISTRATOR` permissions.")

  if (!args.length) return functions.errorEmbed(message, message.channel, "Please specify some emojis");

  for (const rawEmoji of args) {
    const parsedEmoji = Util.parseEmoji(rawEmoji);

    if (parsedEmoji.id) {
      const extension = parsedEmoji.animated ? ".gif" : ".png";
      const url = `https://cdn.discordapp.com/emojis/${parsedEmoji.id + extension}`;

      message.guild.emojis.create(url, parsedEmoji.name)
        .then((emoji) => {
          if (extension === ".gif") return functions.successEmbed(message, message.channel, `<a:${parsedEmoji.name}:${parsedEmoji.id}> added with the name "${parsedEmoji.name}"`)
          else if (extension === ".png") return functions.successEmbed(message, message.channel, `<:${parsedEmoji.name}:${parsedEmoji.id}> added with the name "${parsedEmoji.name}"`)
        })
    }
  }

}

exports.help = {
  name: "steal",
  aliases: ['stl'],
  description: 'Steals an emoji.'
}