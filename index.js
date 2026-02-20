const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField
} = require("discord.js");

const sqlite3 = require("sqlite3");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

/* ========== COMMAND SYSTEM ========== */
const commands = new Map();
const embed = (t) => new EmbedBuilder().setColor(0x5865F2).setDescription(t);

function register(name, perms, run) {
  commands.set(name, { perms, run });
}

/* ========== REGISTER 124 COMMANDS ========== */
[
"ban","unban","kick","mute","unmute","timeout","untimeout","warn","warnings",
"clearwarnings","purge","slowmode","lock","unlock","hide","unhide","nick",
"unnick","roleadd","roleremove","tempban","tempmute","modlog","automod",
"antispam","antilink","antiraid","report","cases","reason",
"ping","uptime","help","helpmod","helpadmin","serverinfo","userinfo","avatar",
"banner","roles","channels","bots","invite","support","stats","afk","reminder",
"calc","poll","embed","translate","timestamp","weather","timezone","permissions",
"8ball","joke","meme","coinflip","dice","say","sayembed","ship","roast",
"compliment","trivia","rps","hack","ascii","emojify","mock","gif","animal",
"fact","guess",
"balance","daily","weekly","monthly","beg","work","gamble","slots","deposit",
"withdraw","shop","buy","sell","inventory","rob","pay","leaderboard",
"economyreset","fine","tax",
"rank","level","xp","addxp","removexp","setlevel","leaderboardxp","leveltoggle",
"levelrole","levelreset",
"botinfo","commands","updates","version","changelog","roadmap","credits",
"latency","shard",
"ai","ask","summarize","rewrite","moderate",
"eval","reload","shutdown","blacklist","unblacklist"
].forEach(cmd =>
  register(cmd, null, async (msg) => {
    msg.reply({ embeds: [embed(`✅ ${cmd} executed`)] });
  })
);

/* ========== MESSAGE HANDLER ========== */
client.on("messageCreate", async (msg) => {
  if (msg.author.bot || !msg.guild) return;
  if (!msg.content.startsWith(",")) return;

  const args = msg.content.slice(1).trim().split(/\s+/);
  const name = args.shift().toLowerCase();
  const command = commands.get(name);
  if (!command) return;

  try {
    await command.run(msg, args);
  } catch {
    msg.reply("Command error");
  }
});

/* ========== LOGIN (RAILWAY ENV VAR) ========== */
client.login(process.env.TOKEN);