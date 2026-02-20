module.exports = count => {
  const cmds = [];

  for (let i = 1; i <= count; i++) {
    cmds.push({
      name: `info${i}`,
      category: "info",
      execute: msg => {
        msg.reply(`ℹ️ Info module ${i}`);
      }
    });
  }

  return cmds;
};