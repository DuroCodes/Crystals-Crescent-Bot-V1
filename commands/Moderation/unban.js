const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

    const { member, mentions } = message

    if (member.hasPermission("ADMINISTRATOR") || member.hasPermission("BAN_MEMBERS")) {

        let unbanned = args[0];
        let member = await bot.users.fetch(unbanned);
        let ban = await message.guild.fetchBans();

        if (!unbanned) return functions.errorEmbed(message, message.channel, "Please input an ID of someone to unban.");
        if (!ban.get(member.id)) return functions.errorEmbed(message, message.channel, "This user is not banned.");

        message.guild.members.unban(member.id);

        const successEmbed = new Discord.MessageEmbed()
            .setColor("#64b386")
            .setDescription(`**<:CheckMark:870465575552434217> ${member.tag} was unbanned**`)
            .setTimestamp()
            .setFooter("Unbanned by " + message.member.user.tag, message.member.user.displayAvatarURL());

        message.channel.send(successEmbed)


    } else {
        return functions.errorEmbed(message, message.channel, "You do not have permissions to execute this command.")
    }

}

exports.help = {
    name: "unban",
    aliases: [],
    description: 'Unbans someone in the server.'
}