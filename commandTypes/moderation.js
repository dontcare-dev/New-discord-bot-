module.exports = count => {
  const cmds = [];

  for (let i = 1; i <= count; i++) {
    cmds.push({
      name: `warncase${i}`,
      category: "moderation",
      execute: async msg => {
        if (!msg.member.permissions.has("ModerateMembers")) {
          return msg.reply("❌ No permission.");
        }
        msg.reply(`⚠️ Warning issued (case ${i})`);
      }
    });
  }

  return cmds;
};