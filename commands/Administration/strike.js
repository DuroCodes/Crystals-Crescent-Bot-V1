const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

exports.run = async (bot, message, args, functions) => {

    message.delete();

    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.errorEmbed(message, message.channel, "You do not have `ADMINISTRATOR` permissions.")

    const user = message.mentions.members.first()

    if (!user) return functions.errorEmbed(message, message.channel, "Please mention the person you wish to give a strike `-strike <@mention> [reason]`.")
    if (message.author.id === user.id) return functions.errorEmbed(message, message.channel, "You cannot give a strike to yourself.")

    var reason = args.slice(1).join(" ")
    if (!reason) var reason = "No Reason Given"

    const date = new Date().toLocaleDateString("en-US")

    functions.successEmbed(message, message.channel, `\`${bot.users.cache.get(user.id).tag}\` has been successfully receieved a strike with reason \`${reason}\`.`)
    db.push(`strikes_${message.guild.id}_${user.id}.reason`, reason)
    db.push(`strikes_${message.guild.id}_${user.id}.date`, date)

}

exports.help = {
    name: "strike",
    aliases: [],
    description: 'Give a user a strike.'
}