import { SlashCommandBuilder } from "@discordjs/builders";

const testCommand = new SlashCommandBuilder()
  .setName("test")
  .setDescription("command for test like console log the channel info");

export { testCommand };
