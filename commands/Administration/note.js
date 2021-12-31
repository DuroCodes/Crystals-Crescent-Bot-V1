const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

exports.run = async (bot, message, args, functions) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.errorEmbed(message, message.channel, "You do not have `ADMINISTRATOR` permissions.")

    const user = message.mentions.members.first()

    if (!user) return functions.errorEmbed(message, message.channel, "Please mention the person you wish to give a note `-note <@mention> [reason]`.")
    if (message.author.id === user.id) return functions.errorEmbed(message, message.channel, "You cannot give a strike to yourself.")

    var note = args.slice(1).join(" ")
    if (!note) var note = "No Note Given"

    const date = new Date().toLocaleDateString("en-US")

    functions.successEmbed(message, message.channel, `\`${bot.users.cache.get(user.id).tag}\` has been successfully received the note \`${note}\`.`)
    db.push(`notes_${message.guild.id}_${user.id}.reason`, note)
    db.push(`notes_${message.guild.id}_${user.id}.date`, date)

}

exports.help = {
    name: "note",
    aliases: [],
    description: 'Give a user a note.'
}