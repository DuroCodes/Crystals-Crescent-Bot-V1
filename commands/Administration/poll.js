const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  if (message.member.hasPermission('ADMINISTRATOR')) {


    const options = [
      '1️⃣',
      '2️⃣',
      '3️⃣',
      '4️⃣',
      '5️⃣',
      '6️⃣',
      '7️⃣',
      '8️⃣',
      '9️⃣',
      '🔟',
    ];

    var channel = message.mentions.channels.first();
    if (!channel) return functions.errorEmbed(message, message.channel, "Please input a channel.");

    const args = message.content.trim().split(/ +/g).slice(11);
    let question = [];

    for (let i = 1; i < args.length; i++) {
      if (args[i].startsWith('"')) break;
      else question.push(args[i]);
    }

    question = question.join(' ');

    const choices = [];

    const regex = /(["'])((?:\\\1|\1\1|(?!\1).)*)\1/g;
    let match;
    while (match = regex.exec(args.join(' '))) choices.push(match[2]);

    let content = [];
    for (let i = 0; i < choices.length; i++) content.push(`${options[i]} ${choices[i]}`);
    content = content.join('\n');

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
      if (counter < questions.length) m.channel.send(questions[counter++])
    })

    collector.on('end', collected => {
      let counter = 0

      var embed = new Discord.MessageEmbed()
        .setColor('#487dcf')
        .setTitle(`**${question}**`)
        .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
        .setFooter("play.crystals-crescent.com", bot.user.displayAvatarURL())
        .setTimestamp()
        .setDescription(content);

      collected.forEach((value) => {
        counter++
        if (counter === 1) channel.send(value.content, { embed: embed })
          .then(async m => { for (let i = 0; i < choices.length; i++) await m.react(options[i]); });
      })
    })
  } else return functions.errorEmbed(message, message.channel, "You do not have `ADMINISTRATOR` permissions.")
}

exports.help = {
  name: "poll",
  aliases: ['pol'],
  description: 'Create a poll.'
}