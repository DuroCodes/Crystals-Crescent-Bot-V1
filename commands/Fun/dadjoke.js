const Discord = require("discord.js");
const request = require("request");

let options = {
  headers: {
    "User-Agent": "SSHHIO Bot"
  },
  json: true
};

exports.run = async (bot, message, args, functions) => {
  request("https://icanhazdadjoke.com/", options, (err, res, body) => {
    if (err) {
      return;
    }

    var embed = new Discord.MessageEmbed()
      .setTitle("Dad Joke")
      .setColor("RANDOM")
      .setDescription(body.joke);

    message.channel.send(embed);
  });
};

exports.help = {
  name: "dadjoke",
  aliases: ['joke', 'dj'],
  description: "Returns a random dad joke."
}