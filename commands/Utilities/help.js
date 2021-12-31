const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  let helpEmbed = new Discord.MessageEmbed()
    .setTitle("**Crystals Crescent Commands**")
    .setColor(color.black)
    .setDescription("[args] are required arguments. | (args) are optional arguments.")
    .addField("**⚒️ | Utilities**", "`-help (staff)` - displays all commands in the bot.\n`-ip` - displays the minecraft server ip.\n`-suggest` - create a suggestion for the server.")
    .addField("**🎲 | Fun**", "`-banner (user)` - returns a user's banner.\n`-pp (user)` - detects the user's penis size and displays it.\n`-dadjoke` - returns a dad joke.\n`-gayrate (user)` - detects how gay a user is.\n`-kiss [user]` - kisses the mentioned user.\n`-kill [user]` - kills the mentioned user in a funny way.\n`-vent [messsage]` - creates an anonymous message for vents.\n`-8ball [question]` - answers your questions with an 8-ball!")
    .addField("**📊 | Stats**", "`-bw [username]` - retrieves a user's BedWars stats.\n`-sw [username]` - retrieves a user's SkyWars stats.\n`-nh [username]` - retrieves a user's name history.")
    .addField("**🎟️ | Tickets**", "`-new (reason)` - create a ticket with a reason.")
    .setFooter(`Type -help staff for staff commands.`, bot.user.displayAvatarURL())
    .setTimestamp();

  let staffEmbed = new Discord.MessageEmbed()
    .setTitle("**Crystals Crescent Staff Commands**")
    .setColor(color.black)
    .setDescription("[args] are required arguments. | (args) are optional arguments.")
    .addField("**⚒️ | Utilities**", "`-embed [channel] [json data]` - creates an embed.")
    .addField("**⚙️ | Administration**", "`-announce [announcement]` - creates an announcement to the server.\n`-poll [question] [options]` - create a poll for the server.\n`-event` - create an event embed.\n`-steal` - steal an emoji from another server.\n`-strike [user] [reason]` - creates a strike for a user.\n`-rstrikes [user]` - resets a user's strikes.\n`-note [user] [reason]` - creates a note for a user.\n`-rnotes [user]` - resets a user's notes.\n`-history [user]` - view a user's notes and strike history.")
    .addField("**🛡️ | Moderation**", "`-purge [messages]` - purges a number of messages in the server.\n`-punish [dc/mc]` - create a punish embed.\n`-rollback` - create a rollback request.\n`-inactivity` - create an inactivity notice.")
    .addField("**🎟️ | Tickets**", "`-transcript` - gets the transcript of a ticket.\n`-add [user]` - adds a user to a ticket.\n`-remove [user]` - removes a user from a ticket.\n`-claim` - allows a member to claim a ticket.\n`-close/fc (reason)` - closes a ticket.\n`-setlogs [channel]` - sets the logs channel for the ticket system.")
    .setFooter(`Crystals Crescent Bot`, bot.user.displayAvatarURL())
    .setTimestamp();

  if (args.join(" ") === "staff") {
    message.channel.send(staffEmbed)
  } else {
    message.channel.send(helpEmbed)
  }

}
exports.help = {
  name: "help",
  aliases: ['h'],
  description: 'Displays all commands in the bot.'
}