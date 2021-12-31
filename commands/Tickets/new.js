const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

    let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));
    const user = message.author;

    message.delete()

    if (!message.guild.channels.cache.find(c => c.name === `ticket-${user.username}`)) {

        let role = message.guild.roles.cache.find(r => r.name === "꒰Support Team꒱");
        if (!role) {
            message.guild.roles.create({ data: { name: "꒰Support Team꒱", permissions: 0 }, reason: 'Staff need this role to view tickets.' });
            message.channel.send(`Please react to the ticket creation message again.`).then(m => m.delete({ timeout: 5000 }).catch(e => { }));
            return
        }
        let categoria = message.guild.channels.cache.find(c => c.name == "˗ˏˋ Support ´ˎ˗" && c.type == "category");
        if (!categoria) categoria = await message.guild.channels.create("ticket", { type: "category", position: 1 }).catch(e => { return functions.errorEmbed(message, message.channel, "An error has occurred.") });

        let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

        message.guild.channels.create(`ticket-${user.username}`, {
            permissionOverwrites: [
                {
                    deny: 'VIEW_CHANNEL',
                    id: message.guild.id
                },
                {
                    allow: permsToHave,
                    id: user.id
                },
                {
                    allow: permsToHave,
                    id: role.id
                }
            ],
            parent: categoria.id,
            reason: `This user needs help`,
            topic: `**ID:** ${user.id} -- **Tag:** ${user.tag} | -close`
        }).then(channel => {

            let createdEmbed = new Discord.MessageEmbed()
                .setAuthor(`📝 | Ticket Open`)
                .setTimestamp()
                .setColor(color.none)
                .setFooter(`Ticket System`, bot.user.displayAvatarURL())
                .setDescription(`A user has opened a ticket and is waiting for their request to be handled.`)
                .addField(`Information`, `**User :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** ${channel}\n**Date :** \`${dateFormat(new Date(), "mm/dd/yyyy - HH:MM:ss")}\``);

            const ticketsupport = message.guild.roles.cache.find(r => r.name === "꒰Support Team꒱");
            if (logsChannel) logsChannel.send(createdEmbed);

            let glitchSuccess = new Discord.MessageEmbed()
                .setColor('#C0142F')
                .setTitle(`🎟️ | Ticket`)
                .setDescription(`Hello <@${user.id}> our support team will be with you soon!\nIn the meantime please describe your issue further!\n\n**Ticket Topic:**\n${args.join(" ")}`)
                .setFooter('Ticket System • play.crystals-crescent.com', bot.user.displayAvatarURL())
                .setTimestamp();

            channel.send(`${ticketsupport}`, { embed: glitchSuccess });
            let name = user.username.toLowerCase();

            db.set(`ticket.ticket-${name}`, { user: user.id });
        })
        return;
    } else {
        message.reply({ embed: already }).then(m => m.delete({ timeout: 5000 }).catch(e => { }));
    }

}
exports.help = {
    name: "new",
    aliases: ['n'],
    description: 'Creates a ticket.'
}