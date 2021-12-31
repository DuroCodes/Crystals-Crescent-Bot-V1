const Discord = require("discord.js");
const fs = require("fs");
const message = require("../../events/message");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  if (args[0] === "s") {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      if (message && message.deleteable) message.delete().catch(e => { });

      let embed = new Discord.MessageEmbed()
        .setTitle(`**🎟️ | Support Ticket**`)
        .setColor("#E04A60")
        .setDescription("To create a support ticket react to this message with the corresponding emoji or by typing `-new [reason]`.\n\n**Reasons to create a ticket:**\n:crossed_swords: Staff Complaint (Only Management Staff+ Can See)\n:pick: Ban Request\n:game_die: Rollback Request\n:pencil2: Staff Check-In (Only Management Staff+ Can See)")
        .setFooter("If you open a ticket and do not respond in 24 hours, it will be deleted.", bot.user.displayAvatarURL());

      message.channel.send(embed).then(m => {
        m.react("⚔️")
          .then(() => m.react("⛏️"))
          .then(() => m.react("🎲"))
          .then(() => m.react("✏️"))
      })
    }
  } else {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      if (message && message.deletable) message.delete().catch(e => { });

      let embed = new Discord.MessageEmbed()
        .setTitle(`**🎟️ | Support Ticket**`)
        .setColor("#E04A60")
        .setDescription("To create a support ticket react to this message with the corresponding emoji or by typing `-new [reason]`.\n\n**Reasons to create a ticket:**\n:bomb: Griefed/Stolen/Missing Items\n:zap: Server Glitches\n:hammer: Ban Appeal\n:pencil: Reporting A Player\n:crossed_swords: Staff Complaint (Only Admin+ Can See)\n⚙️ Other")
        .setFooter("If you open a ticket and do not respond in 24 hours, it will be deleted.", bot.user.displayAvatarURL());
      message.channel.send(embed).then(m => {
        m.react("💣")
          .then(() => m.react("⚡"))
          .then(() => m.react("🔨"))
          .then(() => m.react("📝"))
          .then(() => m.react("⚔️"))
          .then(() => m.react("⚙️"))
      })
    }
  }

}

exports.help = {
  name: "ticket",
  aliases: ['createticket', "t"],
  description: "Create a ticket embed"
}