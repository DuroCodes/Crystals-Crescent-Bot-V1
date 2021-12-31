const Discord = require("discord.js");
const config = require("./Storage/config.json");

// test

const bot = new Discord.Client({
    disableEveryone: false,
    autoReconnect: true,
    disabledEvents: ["TYPING_START"],
    partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION']
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.event = new Discord.Collection();

const loadCommands = require("./functions/commands.js");
const loadEvents = require("./functions/events.js");

const load = async() => {
    await loadCommands.run(bot);
    await loadEvents.run(bot);
}

require('discord-buttons')(bot);

bot.on('guildMemberAdd', member => { 

  let channel = member.guild.channels.cache.find((channel) => channel.name.toLowerCase() === `┃welcome`)
  if(!channel) return;

  welcomeEmbed = new Discord.MessageEmbed()
  .setTitle("Welcome to Crystals Crescent!")
  .setColor("#5BDFEB")
  .setDescription("Make sure to check out <#810055153184145429> <#783830294490644502> <#782483320470372353> <#819860756878196736>!")
  .setTimestamp();

  member.roles.add('817179553189330944') // Rank Role
  member.roles.add('817160423815643138') // Pronouns Role
  member.roles.add('818300618627481641') // Sexuality Role
  member.roles.add('819883689508732928') // Continent Role
  member.roles.add('818678244244062238') // Zodiac Sign Role
  member.roles.add('817162575803973706') // Platform Role
  member.roles.add('817186872509202432') // Announcements Role
  member.roles.add('818313068580438026') // Other Role
  member.roles.add('784688720074768394') // Member Role

  member.roles.add('784918467370942464') // LunarCore MC Updates
  member.roles.add('853141960603860992') // Crystals Cavern Updates
  member.roles.add('873796331477557248') // Infinity Updates
  member.roles.add('887406135404019772') // One Block Updates
  member.roles.add('860382701769064469') // Creative Updates
  member.roles.add('817186608205660180') // Discord Updates
  member.roles.add('826249671222624316') // TikTok Updates
  member.roles.add('882057484884402176') // Twitter Updates
  member.roles.add('882057483751915530') // Instagram Updates
  member.roles.add('882057482481045535') // Facebook Updates

  channel.send(`Welcome, ${member}`,  { embed: welcomeEmbed })

})

// bot.on('guildMemberRemove', member => { 

//   let channel = member.guild.channels.cache.find((channel) => channel.name.toLowerCase() === `┃welcome`)
//   if(!channel) return;

//   leaveEmbed = new Discord.MessageEmbed()
//   .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
//   .setColor("#5BDFEB")
//   .setDescription(`${member.user.id} has left the server.`)
//   .setTimestamp();
    
//   channel.send(leaveEmbed)
// })

load();
bot.login(config.token).then().catch(reason => {

    console.log("Login failed: " + reason);
    console.log("Token used: " +  config.token);

});