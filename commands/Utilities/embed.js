const Discord = require("discord.js");
const fs = require("fs");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  if (message.member.hasPermission('ADMINISTRATOR')) {
    const channel = message.mentions.channels.first();
    if (!channel) return functions.errorEmbed(message, message.channel, "Please input a channel.");

    args.shift()

    try {
      const json = JSON.parse(args.join(' '))
      const { plainText = '' } = json
      message.delete();
      channel.send('', {
        embed: json
      })
    } catch (error) {
      return functions.errorEmbed(message, message.channel, `Invalid JSON, create one here: https://embedbuilder.nadekobot.me/`);
    }
  } else {
    functions.errorEmbed(message, message.channel, "You do not have `ADMINISTRATOR` permissions ");
    message.delete();
  }

}

exports.help = {
  name: "embed-builder",
  aliases: ['emb', "embed"],
  description: "Creates an embed."
}