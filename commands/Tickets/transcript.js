const { fetchTranscript } = require('discord-ghost-transcript');
const { MessageAttachment } = require('discord.js');

exports.run = async (bot, message, args, functions) => {
  await message.delete();
  const channel = message.channel;
  fetchTranscript(channel, message, 99).then((data) => {
    const file = new MessageAttachment(data, "index.html");

    message.author.send("To view the transcript, download the file and open it.", file);

  })

}

exports.help = {
  name: "transcript",
  aliases: ['tr'],
  description: 'Returns a ticket transcript.'
}