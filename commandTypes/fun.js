module.exports = count => {
  const cmds = [];

  for (let i = 1; i <= count; i++) {
    cmds.push({
      name: `rollmax${i}`,
      category: "fun",
      execute: msg => {
        const roll = Math.floor(Math.random() * i) + 1;
        msg.reply(`🎲 Rolled ${roll} / ${i}`);
      }
    });
  }

  return cmds;
};