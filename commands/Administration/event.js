const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

  if (!message.member.hasPermission('ADMINISTRATOR')) return functions.errorEmbed(message, message.channel, "You do not have `ADMINISTRATOR` permissions.")

  const questions = [
    "Which event? (Options: Parkour Event, Build Battle, Hunger Games, etc.)",
    "What is the date and time for the event? (Example: 1/1/2021 12:00pm CST) "
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

    let eventName
    let eventDate

    collected.forEach((value) => {

      counter++
      if (counter === 1) eventName = value.content
      if (counter === 2) eventDate = value.content
    })

    if (eventName.toLowerCase() === "parkour event") {

      const lowercaseEventName = eventName.toLowerCase()
      const capitalizedEventName = lowercaseEventName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());

      const parkourEmbed = new Discord.MessageEmbed()
        .setTitle("Parkour Event")
        .setDescription(`
      <a:Arrow_White:882442397013930015>**Theme:** ${capitalizedEventName}

      <a:Arrow_White:882442397013930015>**Date/Time:** ${eventDate}
      
      <a:Arrow_White:882442397013930015>**Event Description:**
      <:PinkDot:882449684906536990> 

      <a:Arrow_White:882442397013930015>**Information:**
      <:PinkDot:882449684906536990> 

      <a:Arrow_White:882442397013930015>**Rules:**
      <:PinkDot:882449684906536990> All rules and guidelines already in place by Crystals Crescent apply for events
      <:PinkDot:882449684906536990> Have good sportsmanship
      <:PinkDot:882449684906536990> Stay in the designated event area at all times
      **Failure to follow these rules will result in immediate disqualification**

      <a:Arrow_White:882442397013930015>**Placement and Prizes:**
      <a:Heart_Key:862533153948565504>`)
        .setColor('#FFB9E8')
        .setAuthor(message.member.user.tag, message.member.user.displayAvatarURL())
        .setFooter(`Crystals Crescent | play.crystals-crescent.com`, bot.user.displayAvatarURL())
        .setTimestamp();

      message.channel.send({ embed: parkourEmbed })
    }

  })
}
exports.help = {
  name: "event",
  aliases: ['evnt'],
  description: 'Creates an event embed.'
}