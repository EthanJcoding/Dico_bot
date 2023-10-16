async function handleCommandInteraction(interaction) {
  if (!interaction.isCommand()) return;

  const { commandName, options } = interaction;

  if (commandName === "schedule") {
    const date = options.getString("date");
    const time = options.getString("time");
    const scheduledTime = new Date(`${date}T${time}:00`);
    console.log(scheduledTime);

    // Implement your scheduling logic here using scheduledTime.
    // You can use libraries like 'node-schedule' or 'node-cron' for scheduling tasks.

    await interaction.reply(`Scheduling is complete for ${date} ${time}`);
  }
}
module.exports = { handleCommandInteraction };
