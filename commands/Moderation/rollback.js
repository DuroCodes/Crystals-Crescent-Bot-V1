const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

    const questions = [
        "Which server is this for? (Example: LunarCore MC)",
        "What is the user's in game name? (Example: Duro)",
        "What are the coordinates that need to be rolled-back? (Example: 0, 0, 0)",
        "What is the radius that needs to be rolledback? (Example: 5)",
    ]
    let counter = 0

    const filter = m => m.author.id === message.author.id
    const collector = new Discord.MessageCollector(message.channel, filter, {
        max: questions.length,
        time: 1000 * 60
    })

    message.channel.send(questions[counter++])
    collector.on('collect', m => {
        if (counter < questions.length) {
            m.channel.send(questions[counter++])
        }
    })

    collector.on('end', collected => {
        let counter = 0

        const embed = new Discord.MessageEmbed()
            .setTitle("**Rollback Request:**")
            .setColor("#ff00ff")
            .setFooter("Punishment by " + message.member.user.tag, message.member.user.displayAvatarURL())
            .setTimestamp();

        collected.forEach((value) => {

            counter++
            if (counter === 1) embed.addField("**Server:**", '`' + value.content + '`')
            if (counter === 2) embed.addField("**In Game Name:**", '`' + value.content + '`')
            if (counter === 3) embed.addField("**Coordinates:**", '`' + value.content + '`')
            if (counter === 4) embed.addField("**Rollback Radius:**", '`' + value.content + '`')
        })
        let channel = bot.channels.cache.get('878245581338857492')
        channel.send(embed)
    })
}
exports.help = {
    name: "rollback",
    aliases: ['rb'],
    description: 'Punishes someone in the server.'
}