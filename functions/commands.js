const { readdirSync } = require("fs");
const { join } = require("path");
const filePath = join(__dirname, "..", "commands");
const fs = require("fs");

const functions = require("../functions/functions.js");

module.exports.run = (bot) => {
    functions.loadCommands(bot, `${filePath}/Utilities/`);
    functions.loadCommands(bot, `${filePath}/Administration/`);
    functions.loadCommands(bot, `${filePath}/Fun/`);
    functions.loadCommands(bot, `${filePath}/Stats/`);
    functions.loadCommands(bot, `${filePath}/Tickets/`);
    functions.loadCommands(bot, `${filePath}/Moderation/`);
    functions.loadCommands(bot, `${filePath}/Music/`);
}