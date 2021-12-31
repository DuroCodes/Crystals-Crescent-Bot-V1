const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

    const questions = [
        "What is your suggestion? (Example: Remove phantoms)",
        "Which server is this suggestion for? (Example: LunarCore MC)"
    ]
    let counter = 0

    const filter = m => m.author.id === message.author.id
    const collector = new Discord.MessageCollector(message.channel, filter, {
        max: questions.length,
        time: 1000 * 240
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
            .setTitle("**Suggestion:**")
            .setColor(color.purple)
            .setFooter("Suggestion by " + message.member.user.tag, message.member.user.displayAvatarURL())
            .setTimestamp();

        collected.forEach((value) => {

            counter++
            if (counter === 2) embed.setDescription("**Server:**\n" + value.content)
            if (counter === 1) embed.addField("**Suggestion:**", value.content)
        })
        let channel = message.guild.channels.cache.find(channel => channel.name == "┃suggestions").send(embed).then(m => {
            m.react("✅")
                .then(() => m.react("❎"));
        })
        if (!channel) return functions.errorEmbed(message, message.channel, "Could not find the suggestion channel.");
    })


    // let suggestion = args.join(" ")
    // if(!suggestion) return functions.errorEmbed(message, message.channel, "Please include a suggestion.");

    // let suggestEmbed = new Discord.MessageEmbed()
    // .setTitle("**Suggestion:**")
    // .setColor(color.purple)
    // .setDescription(`${suggestion}\n\n**Suggested By:**\n<@${message.author.id}>`)
    // .setFooter(`Crystals Crescent Bot`, bot.user.displayAvatarURL())
    // .setTimestamp();

}
exports.help = {
    name: "suggest",
    aliases: ["sug"],
    description: 'suggestions.'
}

