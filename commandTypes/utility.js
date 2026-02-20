module.exports = count => {
  const cmds = [];

  for (let i = 1; i <= count; i++) {
    cmds.push({
      name: `utility${i}`,
      category: "utility",
      execute: msg => {
        msg.reply(`🔧 Utility operation ${i} complete.`);
      }
    });
  }

  return cmds;
};