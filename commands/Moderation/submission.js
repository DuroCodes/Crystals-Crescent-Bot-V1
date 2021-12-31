const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

    if (!args[0]) return functions.errorEmbed(message, message.channel, "Please choose punishment type. (`-pun mc` or `-pun dc`)");
    else if (args[0] === "twitter") {

        const questions = [
            "Please provide an image/video link\n**1.** Send the video/image to a random person on Discord (it can be a bot)\n**2.** Click the image/video and choose click 'Open Original'\n**3.** Copy the link.",
            "What would the caption be?",
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
                .setTitle("**Twitter Submission:**")
                .setColor("#ff00ff")
                .setFooter("Submission by " + message.member.user.tag, message.member.user.displayAvatarURL())
                .setTimestamp();

            collected.forEach((value) => {

                counter++
                if (counter === 1) embed.addField("**Media Link:**", '`' + value.content + '`')
                if (counter === 2) embed.addField("**Caption:**", '`' + value.content + '`')
            })
            let channel = bot.channels.cache.get('869713631338725427')
            channel.send(embed)
        })
    }

    else if (args[0] === "tiktok") {
        const questions = [
            "Please provide a video link\n**1.** Send the image to a random person on Discord (it can be a bot)\n**2.** Click the video and choose click 'Open Original'\n**3.** Copy the link.",
            "What would the caption be?",
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
                .setTitle("**TikTok Submission:**")
                .setColor("#ff00ff")
                .setFooter("Submission by " + message.member.user.tag, message.member.user.displayAvatarURL())
                .setTimestamp();

            collected.forEach((value) => {

                counter++
                if (counter === 1) embed.addField("**Media Link:**", '`' + value.content + '`')
                if (counter === 2) embed.addField("**Caption:**", '`' + value.content + '`')
            })
            let channel = bot.channels.cache.get('869713631338725427')
            channel.send(embed)
        })
    }
    else return functions.errorEmbed(message, message.channel, "Please choose submission type. (`-sub twitter` or `-sub tiktok`)");
}

exports.help = {
    name: "submit",
    aliases: ['sub'],
    description: 'Submits a tiktok/twitter post.'
}