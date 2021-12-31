const Discord = require("discord.js");
const Actions = require("anime-actions");

exports.run = async (bot, message, args, functions) => {

  const user = message.mentions.members.first();
  if (!user) return functions.errorEmbed(message, message.channel, 'Please input a user you wish to kiss.');
  const personTagged = bot.users.cache.get(user.id);

  let kissEmbed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username} has kissed ${personTagged.username}`, message.member.user.displayAvatarURL())
    .setColor('#8bb9e7')
    .setImage(await Actions.kiss());

  if (personTagged) return message.channel.send({ embed: kissEmbed });

}

exports.help = {
  name: "kiss",
  aliases: ["kis", "kids"],
  description: "Kisses a user."
}