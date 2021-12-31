const { MessageEmbed } = require('discord.js');
const { MessageMenu, MessageMenuOption, MessageActionRow } = require('discord-buttons');

exports.run = async (bot, message, args, functions) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return functions.errorEmbed(message, message.channel, "You do not have `ADMINISTRATOR` permissions.")

    const PlatformEmbed = new MessageEmbed()
        .setTitle("✧･ﾟ: ✧･ﾟ: Platform :･ﾟ✧:･ﾟ✧")
        .setDescription('Select the platform you play on. You can choose from the following:\n\n💻 **Java**\n📱 **Bedrock**')
        .setFooter("Crystals Crescent | play.crystals-crescent.com", bot.user.displayAvatarURL())

    const JavaOption = new MessageMenuOption()
        .setValue('rolemenu-platform--java')
        .setLabel('Java')
        .setEmoji("💻")
        .setDescription("Please click to get/remove the role")

    const BedrockOption = new MessageMenuOption()
        .setValue('rolemenu-platform--bedrock')
        .setLabel('Bedrock')
        .setEmoji("📱")
        .setDescription("Please click to get/remove the role")

    const menu = new MessageMenu()
        .setPlaceholder('Select your platform...')
        .setID('rolemenu-platform')
        .addOptions([JavaOption, BedrockOption])
        .setMaxValues(2)

    const Row = new MessageActionRow()
        .addComponent(menu)

    message.channel.send(PlatformEmbed, Row)

    bot.on('clickMenu', async menu => {
        const Member = await menu.message.guild.members.fetch({
            user: menu.clicker.user.id,
            force: true
        })

        for (const value of menu.values) {
            if (value === 'rolemenu-platform--java') {
                if (!Member.roles.cache.has('912408594257944606')) {
                    menu.reply.defer()
                    await Member.roles.add('912408594257944606')
                }
                else if (Member.roles.cache.has('912408594257944606')) {
                    menu.reply.defer()
                    await Member.roles.remove('912408594257944606')
                }
            }
            else if (value === 'rolemenu-platform--bedrock') {
                if (!Member.roles.cache.has('912409529793253386')) {
                    menu.reply.defer()
                    await Member.roles.add('912409529793253386')
                }
                else if (Member.roles.cache.has('912409529793253386')) {
                    menu.reply.defer()
                    await Member.roles.remove('912409529793253386')
                }
            }
        }
    })
}

exports.help = {
    name: "rm",
    aliases: ['roles', 'rolemenu'],
    description: 'Role select menu.'
}