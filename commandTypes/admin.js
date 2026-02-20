module.exports = count => {
  const cmds = [];

  for (let i = 1; i <= count; i++) {
    cmds.push({
      name: `adminop${i}`,
      category: "admin",
      execute: msg => {
        if (!msg.member.permissions.has("Administrator")) {
          return msg.reply("❌ Admin only.");
        }
        msg.reply(`🛡️ Admin action ${i} executed.`);
      }
    });
  }

  return cmds;
};