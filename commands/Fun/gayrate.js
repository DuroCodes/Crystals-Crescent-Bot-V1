const Discord = require("discord.js");

exports.run = async (bot, message, args, functions) => {

  if (message.mentions.members.first()) {
    let user = message.mentions.members.first();

    var gayness = Math.floor(Math.random() * Math.floor(101));

    const embed = new Discord.MessageEmbed()
      .setTitle("gay r8 machine")
      .setDescription(bot.users.cache.get(user.id).username + " is " + gayness + "% gay 🏳️‍🌈")
      .setColor("RANDOM");

    return message.channel.send(embed);
  } else {
    let user = message.author;

    var gayness = Math.floor(Math.random() * Math.floor(101));

    const embed = new Discord.MessageEmbed()
      .setTitle("gay r8 machine")
      .setDescription("You are " + gayness + "% gay 🏳️‍🌈")
      .setColor("RANDOM");

    return message.channel.send(embed);
  }

};

exports.help = {
  name: "gayrate",
  aliases: ["gay", "gr"],
  description: "Displays how gay someone is."
}