const Discord = require("discord.js");
const functions = require("../functions/functions.js");

module.exports = async (bot, message) => {

    let prefix = "-";

    const args = message.content.split(/ +/g);
    const command = args.shift().slice(prefix.length).toLowerCase();
    const cmd = bot.commands.get(command) || bot.aliases.get(command);

    if (message.content.toLowerCase() == "what is the ip") {
        let helpEmbed = new Discord.MessageEmbed()
            .setTitle("**Crystals Crescent IP**")
            .setColor("#ff00ff")
            .setDescription("**Server IP/Address:** play.crystals-crescent.com\n**Bedrock Port:** 19132")
            .setFooter(`Crystals Crescent Bot`, bot.user.displayAvatarURL())
            .setTimestamp();
        message.channel.send(helpEmbed)
    }

    else if (!message.content.toLowerCase().startsWith(prefix) || !message.guild || message.author.bot || !cmd) return;

    cmd.run(bot, message, args, functions).catch(e => { return console.log(e) });

}