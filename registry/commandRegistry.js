const moderation = require("../commandTypes/moderation");
const utility = require("../commandTypes/utility");
const fun = require("../commandTypes/fun");
const info = require("../commandTypes/info");
const economy = require("../commandTypes/economy");
const admin = require("../commandTypes/admin");

module.exports = client => {
  const allCommands = [
    ...moderation(250),
    ...utility(250),
    ...fun(250),
    ...info(250),
    ...economy(250),
    ...admin(250)
  ];

  allCommands.forEach(cmd => {
    client.commands.set(cmd.name, cmd);
  });

  console.log(`Loaded ${client.commands.size} commands`);
};