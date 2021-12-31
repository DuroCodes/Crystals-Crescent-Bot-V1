const Discord = require('discord.js');
const functions = require("../functions/functions.js");
const dateFormat = require('dateformat');
const db = require('quick.db');
const fs = require('fs');
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

module.exports = async (bot, reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    let message = reaction.message;
    if (!message) return;
    if (user.bot) return;

    let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));

    let already = new Discord.MessageEmbed()
        .setColor(color.red)
        .setAuthor(`⛔ | Oh no ..`)
        .setDescription(`You can only have one ticket open at a time.`);

    let split = '';
    let usr = user.id.split(split);
    for (var i = 0; i < usr.length; i++) usr[i] = usr[i].trim();

    if (message.embeds.length === 1 && message.embeds[0].title === '**🎟️ | Support Ticket**') {
        if (reaction.emoji.name === "💣") {
            if (!message.guild.channels.cache.find(c => c.name === `ticket-${user.username}-grief`)) {

                let role = message.guild.roles.cache.find(r => r.name === "꒰Support Team꒱");
                if (!role) {
                    message.guild.roles.create({
                        data: {
                            name: "꒰Support Team꒱",
                            permissions: 0
                        },
                        reason: 'Staff need this role to view tickets.'
                    });
                    message.channel.send(`Please react to the ticket creation message again.`).then(m => m.delete({
                        timeout: 5000
                    }).catch(e => { }));
                    reaction.users.remove(user.id);
                    return
                }
                let categoria = message.guild.channels.cache.find(c => c.name == "˗ˏˋ Support ´ˎ˗" && c.type == "category");
                if (!categoria) categoria = await message.guild.channels.create("ticket", {
                    type: "category",
                    position: 1
                }).catch(e => {
                    return functions.errorEmbed(message, message.channel, "An error has occurred.")
                });

                let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

                message.guild.channels.create(`ticket-${user.username}-grief`, {
                    permissionOverwrites: [{
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
                    },
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

                    let griefSuccess = new Discord.MessageEmbed()
                        .setColor('#C0142F')
                        .setTitle(`🎟️ | Ticket Grief`)
                        .setDescription(`Hello <@${user.id}> our support team will be with you soon!\n**In the meantime please answer all these questions:**\n1. What server is this ticket for?\n2. What happened? (generally explain what happened) you can include what is missing here.\n3. Coords you were griefed.\n4. What is your in game name?\n5. List anybody trusted on your plots in game names.`)
                        .setFooter('Ticket System • play.crystals-crescent.com', bot.user.displayAvatarURL())
                        .setTimestamp();

                    channel.send(`${ticketsupport}`, {
                        embed: griefSuccess
                    });
                    let name = user.username.toLowerCase();

                    db.set(`ticket.ticket-${name}-grief`, {
                        user: user.id
                    });
                })
                reaction.users.remove(user.id);
                return;
            } else {
                reaction.users.remove(user.id);
                message.reply({
                    embed: already
                }).then(m => m.delete({
                    timeout: 5000
                }).catch(e => { }));
            }
        } else if (reaction.emoji.name === "⚡") {
            if (!message.guild.channels.cache.find(c => c.name === `ticket-${user.username}-server-glitch`)) {

                let role = message.guild.roles.cache.find(r => r.name === "꒰Support Team꒱");
                if (!role) {
                    message.guild.roles.create({
                        data: {
                            name: "꒰Support Team꒱",
                            permissions: 0
                        },
                        reason: 'Staff need this role to view tickets.'
                    });
                    message.channel.send(`Please react to the ticket creation message again.`).then(m => m.delete({
                        timeout: 5000
                    }).catch(e => { }));
                    reaction.users.remove(user.id);
                    return
                }
                let categoria = message.guild.channels.cache.find(c => c.name == "˗ˏˋ Support ´ˎ˗" && c.type == "category");
                if (!categoria) categoria = await message.guild.channels.create("ticket", {
                    type: "category",
                    position: 1
                }).catch(e => {
                    return functions.errorEmbed(message, message.channel, "An error has occurred.")
                });

                let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

                message.guild.channels.create(`ticket-${user.username}-server-glitch`, {
                    permissionOverwrites: [{
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
                    },
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
                        .setTitle(`🎟️ | Ticket Server Glitch`)
                        .setDescription(`Hello <@${user.id}> our support team will be with you soon!\n**In the meantime please answer all these questions:**\n1. What server is this ticket for?\n2. What happened?`)
                        .setFooter('Ticket System • play.crystals-crescent.com', bot.user.displayAvatarURL())
                        .setTimestamp();

                    channel.send(`${ticketsupport}`, {
                        embed: glitchSuccess
                    });
                    let name = user.username.toLowerCase();

                    db.set(`ticket.ticket-${name}-server-glitch`, {
                        user: user.id
                    });
                })
                reaction.users.remove(user.id);
                return;
            } else {
                reaction.users.remove(user.id);
                message.reply({
                    embed: already
                }).then(m => m.delete({
                    timeout: 5000
                }).catch(e => { }));
            }
        } else if (reaction.emoji.name === "🔨") {
            if (!message.guild.channels.cache.find(c => c.name === `ticket-${user.username}-ban-appeal`)) {

                let role = message.guild.roles.cache.find(r => r.name === "꒰Support Team꒱");
                if (!role) {
                    message.guild.roles.create({
                        data: {
                            name: "꒰Support Team꒱",
                            permissions: 0
                        },
                        reason: 'Staff need this role to view tickets.'
                    });
                    message.channel.send(`Please react to the ticket creation message again.`).then(m => m.delete({
                        timeout: 5000
                    }).catch(e => { }));
                    reaction.users.remove(user.id);
                    return
                }
                let categoria = message.guild.channels.cache.find(c => c.name == "˗ˏˋ Support ´ˎ˗" && c.type == "category");
                if (!categoria) categoria = await message.guild.channels.create("ticket", {
                    type: "category",
                    position: 1
                }).catch(e => {
                    return functions.errorEmbed(message, message.channel, "An error has occurred.")
                });

                let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

                message.guild.channels.create(`ticket-${user.username}-ban-appeal`, {
                    permissionOverwrites: [{
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
                    },
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
                        .setTitle(`🎟️ | Ticket Ban Appeal`)
                        .setDescription(`Hello <@${user.id}> our support team will be with you soon!\n**In the meantime please answer all these questions:**\n1. What server is this ticket for?\n2. What is your Minecraft in game name and Discord username or id?\n3. Who were you banned by?\n4. Why were you banned?\n5. Why do you believe you should be unbanned?\n6. Do you have anything else to add?`)
                        .setFooter('Ticket System • play.crystals-crescent.com', bot.user.displayAvatarURL())
                        .setTimestamp();

                    channel.send(`${ticketsupport}`, {
                        embed: glitchSuccess
                    });
                    let name = user.username.toLowerCase();

                    db.set(`ticket.ticket-${name}-ban-appeal`, {
                        user: user.id
                    });
                })
                reaction.users.remove(user.id);
                return;
            } else {
                reaction.users.remove(user.id);
                message.reply({
                    embed: already
                }).then(m => m.delete({
                    timeout: 5000
                }).catch(e => { }));
            }
        } else if (reaction.emoji.name === "📝") {
            if (!message.guild.channels.cache.find(c => c.name === `ticket-${user.username}-player-report`)) {

                let role = message.guild.roles.cache.find(r => r.name === "꒰Support Team꒱");
                if (!role) {
                    message.guild.roles.create({
                        data: {
                            name: "꒰Support Team꒱",
                            permissions: 0
                        },
                        reason: 'Staff need this role to view tickets.'
                    });
                    message.channel.send(`Please react to the ticket creation message again.`).then(m => m.delete({
                        timeout: 5000
                    }).catch(e => { }));
                    reaction.users.remove(user.id);
                    return
                }
                let categoria = message.guild.channels.cache.find(c => c.name == "˗ˏˋ Support ´ˎ˗" && c.type == "category");
                if (!categoria) categoria = await message.guild.channels.create("ticket", {
                    type: "category",
                    position: 1
                }).catch(e => {
                    return functions.errorEmbed(message, message.channel, "An error has occurred.")
                });

                let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

                message.guild.channels.create(`ticket-${user.username}-player-report`, {
                    permissionOverwrites: [{
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
                    },
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
                        .setTitle(`🎟️ | Ticket Player Report`)
                        .setDescription(`Hello <@${user.id}> our support team will be with you soon!\n**In the meantime please answer all these questions:**\n1. What server is this ticket for?\n2. What is the in game name or Discord username/id of the player you are reporting?\n3. What is the reason of the complaint?\n4. Do you have any evidence to support your claim?`)
                        .setFooter('Ticket System • play.crystals-crescent.com', bot.user.displayAvatarURL())
                        .setTimestamp();

                    channel.send(`${ticketsupport}`, {
                        embed: glitchSuccess
                    });
                    let name = user.username.toLowerCase();

                    db.set(`ticket.ticket-${name}-player-report`, {
                        user: user.id
                    });
                })
                reaction.users.remove(user.id);
                return;
            } else {
                reaction.users.remove(user.id);
                message.reply({
                    embed: already
                }).then(m => m.delete({
                    timeout: 5000
                }).catch(e => { }));
            }
        } else if (reaction.emoji.name === "⚔️") {
            if (!message.guild.channels.cache.find(c => c.name === `ticket-${user.username}-staff-complaint`)) {

                let role = message.guild.roles.cache.find(r => r.name === "⸻Management Staff⸻");
                if (!role) {
                    message.guild.roles.create({
                        data: {
                            name: "⸻Management Staff⸻",
                            permissions: 0
                        },
                        reason: 'Staff need this role to view tickets.'
                    });
                    message.channel.send(`Please react to the ticket creation message again.`).then(m => m.delete({
                        timeout: 5000
                    }).catch(e => { }));
                    reaction.users.remove(user.id);
                    return
                }
                let categoria = message.guild.channels.cache.find(c => c.name == "˗ˏˋ Support ´ˎ˗" && c.type == "category");
                if (!categoria) categoria = await message.guild.channels.create("ticket", {
                    type: "category",
                    position: 1
                }).catch(e => {
                    return functions.errorEmbed(message, message.channel, "An error has occurred.")
                });

                let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

                message.guild.channels.create(`ticket-${user.username}-staff-complaint`, {
                    permissionOverwrites: [{
                        deny: 'VIEW_CHANNEL',
                        id: message.guild.id
                    },
                    {
                        allow: permsToHave,
                        id: user.id
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

                    const ticketsupport = message.guild.roles.cache.find(r => r.name === "⸻Management Staff⸻");
                    if (logsChannel) logsChannel.send(createdEmbed);

                    let glitchSuccess = new Discord.MessageEmbed()
                        .setColor('#C0142F')
                        .setTitle(`🎟️ | Ticket Staff Complaint`)
                        .setDescription(`Hello <@${user.id}> our management staff will be with you soon!\n**In the meantime please answer all these questions:**\n1. What server is this ticket for?\n2. What is the in game name or Discord username/id of the staff member you are reporting?\n3. What is the reason of the complaint?\n4. Do you have any evidence to support your claim?`)
                        .setFooter('Ticket System • play.crystals-crescent.com', bot.user.displayAvatarURL())
                        .setTimestamp();

                    channel.send(`${ticketsupport}`, {
                        embed: glitchSuccess
                    });
                    let name = user.username.toLowerCase();

                    db.set(`ticket.ticket-${name}-staff-complaint`, {
                        user: user.id
                    });
                })
                reaction.users.remove(user.id);
                return;
            } else {
                reaction.users.remove(user.id);
                message.reply({
                    embed: already
                }).then(m => m.delete({
                    timeout: 5000
                }).catch(e => { }));
            }
        } else if (reaction.emoji.name === "⚙️") {
            if (!message.guild.channels.cache.find(c => c.name === `ticket-${user.username}`)) {

                let role = message.guild.roles.cache.find(r => r.name === "꒰Support Team꒱");
                if (!role) {
                    message.guild.roles.create({
                        data: {
                            name: "꒰Support Team꒱",
                            permissions: 0
                        },
                        reason: 'Staff need this role to view tickets.'
                    });
                    message.channel.send(`Please react to the ticket creation message again.`).then(m => m.delete({
                        timeout: 5000
                    }).catch(e => { }));
                    reaction.users.remove(user.id);
                    return
                }
                let categoria = message.guild.channels.cache.find(c => c.name == "˗ˏˋ Support ´ˎ˗" && c.type == "category");
                if (!categoria) categoria = await message.guild.channels.create("ticket", {
                    type: "category",
                    position: 1
                }).catch(e => {
                    return functions.errorEmbed(message, message.channel, "An error has occurred.")
                });

                let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

                message.guild.channels.create(`ticket-${user.username}`, {
                    permissionOverwrites: [{
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
                        .setDescription(`Hello <@${user.id}> our support team will be with you soon!\nIn the meantime please describe your issue further!`)
                        .setFooter('Ticket System • play.crystals-crescent.com', bot.user.displayAvatarURL())
                        .setTimestamp();

                    channel.send(`${ticketsupport}`, {
                        embed: glitchSuccess
                    });
                    let name = user.username.toLowerCase();

                    db.set(`ticket.ticket-${name}`, {
                        user: user.id
                    });
                })
                reaction.users.remove(user.id);
                return;
            } else {
                reaction.users.remove(user.id);
                message.reply({
                    embed: already
                }).then(m => m.delete({
                    timeout: 5000
                }).catch(e => { }));
            }
        } else if (reaction.emoji.name === "⛏️") {
            if (!message.guild.channels.cache.find(c => c.name === `ticket-${user.username}-ban-request`)) {

                let role = message.guild.roles.cache.find(r => r.name === "「 Jr. Mod 」");
                if (!role) {
                    message.guild.roles.create({
                        data: {
                            name: "「 Jr. Mod 」",
                            permissions: 0
                        },
                        reason: 'Staff need this role to view tickets.'
                    });
                    message.channel.send(`Please react to the ticket creation message again.`).then(m => m.delete({
                        timeout: 5000
                    }).catch(e => { }));
                    reaction.users.remove(user.id);
                    return
                }
                let categoria = message.guild.channels.cache.find(c => c.name == "˗ˏˋ Support ´ˎ˗" && c.type == "category");
                if (!categoria) categoria = await message.guild.channels.create("ticket", {
                    type: "category",
                    position: 1
                }).catch(e => {
                    return functions.errorEmbed(message, message.channel, "An error has occurred.")
                });

                let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

                message.guild.channels.create(`ticket-${user.username}-ban-request`, {
                    permissionOverwrites: [{
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

                    const ticketsupport = message.guild.roles.cache.find(r => r.name === "「 Jr. Mod 」");
                    if (logsChannel) logsChannel.send(createdEmbed);

                    let glitchSuccess = new Discord.MessageEmbed()
                        .setColor('#C0142F')
                        .setTitle(`🎟️ | Ticket Ban Request`)
                        .setDescription(`Hello <@${user.id}> our support team will be with you soon!\n**In the meantime please answer all these questions:**\n1. What server is this ticket for?\n2. What is the users minecraft in game name?\n3. How long is the ban for?\n4. What is the reason for the ban?\n5. Do you have evidence for the ban?`)
                        .setFooter('Ticket System • play.crystals-crescent.com', bot.user.displayAvatarURL())
                        .setTimestamp();

                    channel.send(`@everyone`, {
                        embed: glitchSuccess
                    });
                    let name = user.username.toLowerCase();

                    db.set(`ticket.ticket-${name}`, {
                        user: user.id
                    });
                })
                reaction.users.remove(user.id);
                return;
            } else {
                reaction.users.remove(user.id);
                message.reply({
                    embed: already
                }).then(m => m.delete({
                    timeout: 5000
                }).catch(e => { }));
            }
        } else if (reaction.emoji.name === "✏️") {
            if (!message.guild.channels.cache.find(c => c.name === `ticket-${user.username}-checkin`)) {

                let role = message.guild.roles.cache.find(r => r.name === "⸻Management Staff⸻");
                let categoria = message.guild.channels.cache.find(c => c.name == "˗ˏˋ Support ´ˎ˗" && c.type == "category");
                if (!categoria) categoria = await message.guild.channels.create("ticket", {
                    type: "category",
                    position: 1
                }).catch(e => {
                    return functions.errorEmbed(message, message.channel, "An error has occurred.")
                });

                let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

                message.guild.channels.create(`ticket-${user.username}-checkin`, {
                    permissionOverwrites: [{
                        deny: 'VIEW_CHANNEL',
                        id: message.guild.id
                    },
                    {
                        allow: permsToHave,
                        id: user.id
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

                    const ticketsupport = message.guild.roles.cache.find(r => r.name === "⸻Management Staff⸻");
                    if (logsChannel) logsChannel.send(createdEmbed);

                    let glitchSuccess = new Discord.MessageEmbed()
                        .setColor('#C0142F')
                        .setTitle(`🎟️ | Ticket Staff Checkin`)
                        .setDescription(`Hello <@${user.id}>, answer all these questions below, everything here is confidential and anything you tell us we will not share, only Management+ can see your messages:\n1. How do you feel about your presence on the staff team?\n2. Are you happy with your current staff position?\n3. Do you think anyone should be promoted or demoted or fired?\n4. Is there anyone or anything that you think we should have a look at?\n5. How many hours have you played this week?\n6. Is there anything else you think we should know or you want to say?`)
                        .setFooter('Ticket System • play.crystals-crescent.com', bot.user.displayAvatarURL())
                        .setTimestamp();

                    channel.send(`${ticketsupport}`, {
                        embed: glitchSuccess
                    });
                    let name = user.username.toLowerCase();

                    db.set(`ticket.ticket-${name}-checkin`, {
                        user: user.id
                    });
                })
                reaction.users.remove(user.id);
                return;
            } else {
                reaction.users.remove(user.id);
                message.reply({
                    embed: already
                }).then(m => m.delete({
                    timeout: 5000
                }).catch(e => { }));
            }
        } else if (reaction.emoji.name === "🎲") {
            if (!message.guild.channels.cache.find(c => c.name === `ticket-${user.username}-rollback-request`)) {

                let role = message.guild.roles.cache.find(r => r.name === "「 Mod 」");
                let role2 = message.guild.roles.cache.find(r => r.name === "「 Admin 」")

                let categoria = message.guild.channels.cache.find(c => c.name == "˗ˏˋ Support ´ˎ˗" && c.type == "category");
                if (!categoria) categoria = await message.guild.channels.create("ticket", {
                    type: "category",
                    position: 1
                }).catch(e => {
                    return functions.errorEmbed(message, message.channel, "An error has occurred.")
                });

                let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

                message.guild.channels.create(`ticket-${user.username}-rollback-request`, {
                    permissionOverwrites: [{
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
                    },
                    {
                        allow: permsToHave,
                        id: role2.id
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

                    const ticketsupport = message.guild.roles.cache.find(r => r.name === "「 Mod 」");
                    if (logsChannel) logsChannel.send(createdEmbed);

                    let glitchSuccess = new Discord.MessageEmbed()
                        .setColor('#C0142F')
                        .setTitle(`🎟️ | Ticket Rollback Request`)
                        .setDescription(`Hello <@${user.id}> our support team will be with you soon!\n**In the meantime please answer all these questions:**\n1. What server is this ticket for?\n2. What is the users minecraft in game name?\n3. What is the user who greifed minecraft in game name?\n4. What are the coordinates that need to be rolledback?\n5. What is the radius that needs to be rolled back?`)
                        .setFooter('Ticket System • play.crystals-crescent.com', bot.user.displayAvatarURL())
                        .setTimestamp();

                    channel.send(`${role}, ${role2}`, {
                        embed: glitchSuccess
                    });
                    let name = user.username.toLowerCase();

                    db.set(`ticket.ticket-${name}`, {
                        user: user.id
                    });
                })
                reaction.users.remove(user.id);
                return;
            } else {
                reaction.users.remove(user.id);
                message.reply({
                    embed: already
                }).then(m => m.delete({
                    timeout: 5000
                }).catch(e => { }));
            }
        } else {
            reaction.users.remove(user.id);
        }
    }

    if (message.embeds.length === 1 && message.embeds[0].title === '🎟️ | Ticket Completed' && message.embeds[0].description === `React with 🗑️ to close the ticket or do not react if you have other requests.`) {
        if (reaction.emoji.name === "🗑️") {
            if (user.id === db.get(`ticket.${message.channel.name}.user`)) {

                let deletedEmbed = new Discord.MessageEmbed()
                    .setAuthor(`🗑️ | Ticket Closed`)
                    .setColor(color.none)
                    .setDescription(`The author has confirmed the ticket has been closed.`)
                    .setTimestamp()
                    .setFooter(`Ticket System`, bot.user.displayAvatarURL())
                    .addField(`Information`, `**User :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Date :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);

                if (logsChannel) logsChannel.send(deletedEmbed);

                message.channel.delete();

            }
        }
    }

}