const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

exports.run = async (bot, message, args, functions) => {

    message.delete();

    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.errorEmbed(message, message.channel, "You do not have `ADMINISTRATOR` permissions.")

    const user = message.mentions.members.first()

    if (!user) return functions.errorEmbed(message, message.channel, "Please mention the person you wish to reset `-rnotes <@mention>`.")
    if (message.author.id === user.id) return functions.errorEmbed(message, message.channel, "You cannot reset your own notes.")

    let notes = db.get(`notes_${message.guild.id}_${user.id}`)
    if (notes === null) return functions.errorEmbed(message, message.channel, `${bot.users.cache.get(user.id).tag} does not have any notes.`)

    functions.successEmbed(message, message.channel, `\`${bot.users.cache.get(user.id).tag}\`'s notes have been successfully reset.`)
    db.delete(`notes_${message.guild.id}_${user.id}`)

}

exports.help = {
    name: "rnotes",
    aliases: ['rnote'],
    description: 'Reset a user\'s note(s).'
}