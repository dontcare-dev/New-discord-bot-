const {
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require("discord.js");

module.exports = async (message, client) => {
  const categories = [...new Set(
    client.commands.map(cmd => cmd.category)
  )];

  const menu = new StringSelectMenuBuilder()
    .setCustomId("help_menu")
    .setPlaceholder("Select a category")
    .addOptions(
      categories.map(cat => ({
        label: cat.toUpperCase(),
        value: cat
      }))
    );

  const row = new ActionRowBuilder().addComponents(menu);

  const embed = new EmbedBuilder()
    .setTitle("📘 Help Menu")
    .setDescription("Choose a category to view commands")
    .setColor("Blue");

  const sent = await message.reply({
    embeds: [embed],
    components: [row]
  });

  const collector = sent.createMessageComponentCollector({
    time: 60000
  });

  collector.on("collect", async i => {
    if (i.user.id !== message.author.id) {
      return i.reply({ content: "Not for you.", ephemeral: true });
    }

    const cmds = client.commands
      .filter(c => c.category === i.values[0])
      .map(c => `\`${c.name}\``)
      .slice(0, 25)
      .join(", ");

    const catEmbed = new EmbedBuilder()
      .setTitle(`📂 ${i.values[0].toUpperCase()}`)
      .setDescription(cmds || "No commands")
      .setColor("Green");

    await i.update({ embeds: [catEmbed] });
  });
};