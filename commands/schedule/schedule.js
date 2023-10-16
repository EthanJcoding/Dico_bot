// commands.js
const { SlashCommandBuilder } = require("@discordjs/builders");

const scheduleCommand = new SlashCommandBuilder()
  .setName("schedule")
  .setDescription("Create a schedule")
  .addStringOption(option =>
    option.setName("date").setDescription("Date (YYYY-MM-DD)").setRequired(true)
  )
  .addStringOption(option =>
    option.setName("time").setDescription("Time (HH:MM)").setRequired(true)
  );

module.exports = { scheduleCommand };
