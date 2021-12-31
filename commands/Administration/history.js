const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

exports.run = async (bot, message, args, functions) => {

    message.delete();

    if (!message.member.hasPermission("ADMINISTRATOR")) return functions.errorEmbed(message, message.channel, "You do not have `ADMINISTRATOR` permissions.")

    const user = message.mentions.members.first()
    if (!user) return functions.errorEmbed(message, message.channel, "Please mention the person you wish to view the history of `-history <@mention>`.")

    var strikes = db.get(`strikes_${message.guild.id}_${user.id}.reason`)
    var strike_dates = db.get(`strikes_${message.guild.id}_${user.id}.date`)
    var strikes_desc = "`N/A`"

    var notes = db.get(`notes_${message.guild.id}_${user.id}.reason`)
    var notes_desc = "`N/A`"
    var note_dates = db.get(`notes_${message.guild.id}_${user.id}.date`)

    for (var i in strikes) {
        var num = Number(i) + 1
        if (strikes !== null) {
            strikes_desc = ""
            strikes_desc += `**${num.toString()}.** ${strike_dates[i]}: \`${strikes[i]}\`\n`
        }
    }
    for (var i in notes) {
        var num = Number(i) + 1
        if (notes !== null) {
            notes_desc = ""
            notes_desc += `**${num.toString()}.** ${note_dates[i]}: \`${notes[i]}\`\n`
        }
    }

    embed = new MessageEmbed()
        .setTitle("User History")
        .addField("Strikes:", strikes_desc)
        .addField("Notes:", notes_desc)

    message.channel.send({ embed: embed })


}

exports.help = {
    name: "history",
    aliases: ['strikes', 'notes'],
    description: 'Get a user\'s strike history.'
}