const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

    if (!args[0]) return functions.errorEmbed(message, message.channel, "Please choose punishment type. (`-pun mc` or `-pun dc`)");
    else if (args[0] === "mc") {
        const questions = [
            "Which server is this for? (Example: LunarCore MC)",
            "What is the user's in game name? (Example: Duro)",
            "What is the punishment type? (Example: Ban)",
            "What is the reason for the punishment? (Example: Hacking)",
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
                .setTitle("**Punishment:**")
                .setColor("#ff00ff")
                .setFooter("Punishment by " + message.member.user.tag, message.member.user.displayAvatarURL())
                .setTimestamp();

            collected.forEach((value) => {

                counter++
                if (counter === 1) embed.addField("**Server:**", '`' + value.content + '`')
                if (counter === 2) embed.addField("**In Game Name:**", '`' + value.content + '`')
                if (counter === 3) embed.addField("**Punishment Type:**", '`' + value.content + '`')
                if (counter === 4) embed.addField("**Punishment Reason:**", '`' + value.content + '`')
            })
            let channel = bot.channels.cache.get('853057612319686656')
            channel.send(embed)
        })
    }

    else if (args[0] === "dc") {
        const questions = [
            "Which is the user's username and ID? (Example: Duro#5232 + 283312847478325251)",
            "What is the punishment type? (Example: Ban)",
            "What is the reason for the punishment? (Example: Racism)",
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
                .setTitle("**Punishment:**")
                .setColor("#ff00ff")
                .setFooter("Punishment by " + message.member.user.tag, message.member.user.displayAvatarURL())
                .setTimestamp();

            collected.forEach((value) => {

                counter++
                if (counter === 1) embed.addField("**Username and ID:**", '`' + value.content + '`')
                if (counter === 2) embed.addField("**Punishment Type:**", '`' + value.content + '`')
                if (counter === 3) embed.addField("**Punishment Reason:**", '`' + value.content + '`')
            })
            let channel = bot.channels.cache.get('853057417038266368')
            channel.send(embed)
        })
    }
    else return functions.errorEmbed(message, message.channel, "Please choose punishment type. (`-pun mc` or `-pun dc`)");
}

exports.help = {
    name: "punish",
    aliases: ['pun'],
    description: 'Punishes someone in the server.'
}