const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));
const { fetchTranscript } = require('discord-ghost-transcript');
const { MessageAttachment } = require('discord.js');

exports.run = async (bot, message, args, functions) => {

  const channel = message.channel;
  fetchTranscript(channel, message, 99).then((data) => {
    const file = new MessageAttachment(data, "index.html");

    var transcriptEmbed = new Discord.MessageEmbed()
      .setTitle("**🎟️ | Ticket Transcript**")
      .setColor("#C0142F")
      .setDescription(`To view the transcript of ticket \`#${message.channel.name}\`, download the file and open it.`)
    message.author.send(transcriptEmbed)
    message.author.send(file)
  })

  let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));

  if (!message.channel.name.startsWith(`ticket-`)) return;

  let userEmbed = new Discord.MessageEmbed()
    .setAuthor(`🗑️ | Ticket Closed`)
    .setColor(color.none)
    .setDescription(`A user has force-closed the ticket.`)
    .setTimestamp()
    .setFooter(`Ticket System`, bot.user.displayAvatarURL())
    .addField(`Information`, `**User :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "mm/dd/yyyy - HH:MM:ss")}\``);

  db.delete(`ticket.${message.channel.name}`);
  if (logsChannel) await logsChannel.send(userEmbed);
  await message.channel.delete();
  if (!message.author.id === db.get(`ticket.${message.channel.name}.user`)) {

    var reason = args.join(" ");
    if (!reason) {
      var reason = "No Reason Given"
    }

    let creator = db.get(`ticket.${message.channel.name}.user`)

    let forceEmbed = new Discord.MessageEmbed()
      .setAuthor(`🗑️ | Ticket Closed`)
      .setColor(color.none)
      .setDescription(`A member of the Support Team Role closed a ticket with the reason: \`${reason}\``)
      .setTimestamp()
      .setFooter(`Ticket System`, bot.user.displayAvatarURL())
      .addField(`Information`, `**Closed by :** \`${message.author.tag}\`\n**Creator ID : ** \`${creator}\`\n**Reason :** \`${reason}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "mm/dd/yyyy - HH:MM:ss")}\``);

    logsChannel.send(forceEmbed);

    db.delete(`ticket.${message.channel.name}`);

    message.channel.delete();

  }
}





exports.help = {
  name: "force-close",
  aliases: ["fc", "fs"],
  description: "Force-closes a ticket."
}