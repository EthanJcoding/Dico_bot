// index.js
import { REST, Routes } from "discord.js";
import { startBot } from "./bot.js";
import { addUserCommand, scheduleCommand } from "./commands/index.js";

async function initializeCommands() {
  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

  try {
    await rest.put(Routes.applicationCommands(process.env.ID), {
      body: [scheduleCommand, addUserCommand],
    });
    // await client.application.commands.set(
    //   [scheduleCommand, addUserCommand].map(command => command.toJSON())
    // );
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
}

(async () => {
  initializeCommands();
  await startBot();
})();
