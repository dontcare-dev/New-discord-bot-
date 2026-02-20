const balances = {};

module.exports = count => {
  const cmds = [];

  for (let i = 1; i <= count; i++) {
    cmds.push({
      name: `earn${i}`,
      category: "economy",
      execute: msg => {
        balances[msg.author.id] ??= 0;
        balances[msg.author.id] += i;
        msg.reply(`💰 Balance: ${balances[msg.author.id]}`);
      }
    });
  }

  return cmds;
};