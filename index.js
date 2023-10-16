// index.js
const { client, startBot } = require("./bot.js");
const { scheduleCommand } = require("./commands/schedule/schedule.js");
const { handleCommandInteraction } = require("./events/interaction.js");

client.on("interactionCreate", handleCommandInteraction);

async function initializeCommands() {
  try {
    console.log("Started refreshing application (/) commands.");

    await client.application.commands.set(
      [scheduleCommand].map(command => command.toJSON())
    );

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  await startBot();
  initializeCommands();
})();
