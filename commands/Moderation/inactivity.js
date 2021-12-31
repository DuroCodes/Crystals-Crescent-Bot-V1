const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

    const questions = [
        "What is the reason for your inactivity? (Example: Final Exams)",
        "When does your inactivity start? [MM/DD/YYYY] (Example: 08/26/2021)",
        "When does your inactivity end? [MM/DD/YYYY] (Example: 08/30/2021)"
    ]
    let counter = 0

    const filter = m => m.author.id === message.author.id
    const collector = new Discord.MessageCollector(message.channel, filter, {
        max: questions.length,
        time: 1000 * 120
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
            .setTitle("**Inactivity Notice:**")
            .setColor("#ff00ff")
            .setFooter("Inactivity from " + message.member.user.tag, message.member.user.displayAvatarURL())
            .setTimestamp();

        collected.forEach((value) => {

            counter++
            if (counter === 1) embed.addField("**Reason:**", '`' + value.content + '`')
            if (counter === 2) embed.addField("**Start Date:**", '`' + value.content + '`')
            if (counter === 3) embed.addField("**End Date:**", '`' + value.content + '`')
        })
        let channel = bot.channels.cache.get('880570282975301702')
        channel.send(embed)
    })
}
exports.help = {
    name: "inactivity",
    aliases: ['inac'],
    description: 'Creates an inactivity embed.'
}