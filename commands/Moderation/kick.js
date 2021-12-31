const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

    const { member, mentions } = message
    const { username } = message.author
    var reason = args.slice(1).join(" ")
    if (!reason) var reason = "No Reason Specified."

    if (member.hasPermission("ADMINISTRATOR") || member.hasPermission("KICK_MEMBERS")) {
        const target = mentions.members.first()
        if (!target) return functions.errorEmbed(message, message.channel, "Please mention someone to kick.")
        const targetMember = message.guild.members.cache.get(target.id)

        const successEmbed = new Discord.MessageEmbed()
            .setColor("#64b386")
            .setDescription(`**<:CheckMark:870465575552434217> ${target.user.tag} was kicked** | ${reason}`)
            .setTimestamp()
            .setFooter("Punished by " + message.member.user.tag, message.member.user.displayAvatarURL());

        message.delete()
        message.channel.send(successEmbed)

        targetMember.kick({ reason: reason })
    } else {
        return functions.errorEmbed(message, message.channel, "You do not have permissions to execute this command.")
    }

}

exports.help = {
    name: "kick",
    aliases: [],
    description: 'Kicks someone in the server.'
}