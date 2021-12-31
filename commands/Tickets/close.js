const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));
const { fetchTranscript } = require('discord-ghost-transcript');
const { MessageAttachment } = require('discord.js');

exports.run = async (bot, message, args, functions) => {

  var reason = args.join(" ")
  if (!reason) {
    var reason = "No Reason Given"
  }
  let dmMessage = new Discord.MessageEmbed()
    .setColor("#C0142F")
    .setTitle("**🎟️ | Ticket Closed**")
    .setDescription(`Your ticket on Crystals Crescent has been closed with the reason: \`${reason}\``)

  let creator = db.get(`ticket.${message.channel.name}.user`)
  console.log("ID: " + creator)
  bot.users.cache.get(creator).send(dmMessage)

  let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));

  if (!message.channel.name.startsWith(`ticket-`)) return;

  if (message.author.id === db.get(`ticket.${message.channel.name}.user`)) {

    let userEmbed = new Discord.MessageEmbed()
      .setAuthor(`🗑️ | Ticket Closed`)
      .setColor(color.none)
      .setDescription(`The author of the ticket has closed it.`)
      .setTimestamp()
      .setFooter(`Ticket System`, bot.user.displayAvatarURL())
      .addField(`Information`, `**User :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "mm/dd/yyyy - HH:MM:ss")}\``);

    db.delete(`ticket.${message.channel.name}`);
    if (logsChannel) await logsChannel.send(userEmbed);
    await message.channel.delete();
  } else {

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
  name: "close",
  aliases: ["c"],
  description: "Closes a ticket."
}