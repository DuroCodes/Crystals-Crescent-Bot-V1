const Discord = require("discord.js");

exports.run = async (bot, message, args, functions) => {

  const replies = ["It is certain", "Without a doubt", "You may rely on it", "Yes", "Signs point to yes", "Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
  let result = Math.floor(Math.random() * replies.length);
  let question = args.join(" ")
  if (!question) return functions.errorEmbed(message, message.channel, "Please input a question!")

  var color
  if (result <= 4) var color = "#4dff36"
  else var color = "#f71b1b"

  let embed = new Discord.MessageEmbed()
    .setTitle('🎱 | 8 Ball')
    .setColor(color)
    .setDescription(`**Question:** ${question}\n**Answer:** ${replies[result]}`);

  message.channel.send({ embed })
}

exports.help = {
  name: "8ball",
  aliases: ["8", "8b", "roll", "ball"],
  description: "bball random results."
}