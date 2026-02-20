const {
  Client,
  GatewayIntentBits,
  Collection,
  Events
} = require("discord.js");

const config = require("./config.json");
const registerCommands = require("./registry/commandRegistry");
const helpMenu = require("./handlers/helpMenu");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
registerCommands(client);

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/);

  const commandName = args.shift().toLowerCase();

  if (commandName === "help") {
    return helpMenu(message, client);
  }

  const command = client.commands.get(commandName);
  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error(err);
    message.reply("❌ Command error.");
  }
});

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

client.login(process.env.TOKEN);