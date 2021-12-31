const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

exports.run = async (bot, message, args, functions) => {

    const voiceChannel = message.member.voice.channel;

    if (!voiceChannel) return functions.errorEmbed(message, message.channel, 'You need to be in a channel to execute this command.')
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) return functions.errorEmbed(message, message.channel, 'You dont have the `CONNECT` permission.');
    if (!permissions.has('SPEAK')) return functions.errorEmbed(message, message.channel, 'You do not have the `SPEAK` permission.')
    if (!args.length) return functions.errorEmbed(message, message.channel, 'Please enter a valid link.')

    const validURL = (str) => {
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if (!regex.test(str)) {
            return false;
        } else {
            return true;
        }
    }

    if (validURL(args[0])) {

        const connection = await voiceChannel.join();
        const stream = ytdl(args[0], { filter: 'audioonly' });

        connection.play(stream, { seek: 0, volume: 1 })
            .on('finish', () => {
                voiceChannel.leave();
                functions.successEmbed(message, message.channel, 'Leaving Channel');
            });

        await functions.successEmbed(message, message.channel, `Now Playing: ${args[0]}`)
        return
    }


    const connection = await voiceChannel.join();

    const videoFinder = async (query) => {
        const videoResult = await ytSearch(query);
        return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    const video = await videoFinder(args.join(' '));

    if (video) {
        const stream = ytdl(video.url, { filter: 'audioonly' });
        connection.play(stream, { seek: 0, volume: 1 })
            .on('finish', () => {
                voiceChannel.leave();
            });

        await functions.successEmbed(message, message.channel, `Now Playing: ${video.title}`)
    } else {
        functions.errorEmbed(message.channel, message, 'No video results found');
    }
}

exports.help = {
    name: "play",
    aliases: ["p"],
    description: 'Plays music in the user\'s current VC.'
}